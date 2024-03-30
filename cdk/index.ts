#!/usr/bin/env node

import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

interface PersonalSiteProps {
  account: string
  region: string
  domainName: string
  domainCertArn: string
}

// Construct
export class PersonalSite extends Construct {
  constructor(parent: cdk.Stack, name: string, props: PersonalSiteProps) {
    super(parent, name)

    // Props
    const account = props.account
    const region = props.region
    const rootDomain = props.domainName
    const wwwDomain = `www.${props.domainName}`
    const certArn = props.domainCertArn

    // Hosted Zone
    const zone = cdk.aws_route53.HostedZone.fromLookup(this, 'Zone', { domainName: rootDomain })

    // Domain Certificate
    const cert = cdk.aws_certificatemanager.Certificate.fromCertificateArn(this, 'CertArn',
      `arn:aws:acm:${region}:${account}:certificate/${certArn}`
    )

    // Site Log Bucket
    const siteLogBucket = new cdk.aws_s3.Bucket(this, 'SiteLogBucket', {
      bucketName: `${rootDomain}-logs`,
      accessControl: cdk.aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
      lifecycleRules: [{
        transitions: [{
          storageClass: cdk.aws_s3.StorageClass.DEEP_ARCHIVE,
          transitionAfter: cdk.Duration.days(1)
        }]
      }]
    })

    // Root S3 Bucket
    const rootBucket = new cdk.aws_s3.Bucket(this, 'RootBucket', {
      bucketName: rootDomain,
      accessControl: cdk.aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER
    })

    // Root S3 Bucket Policy
    const rootBucketPolicy = new cdk.aws_s3.BucketPolicy(this, 'RootBucketPolicy', { bucket: rootBucket })
    rootBucketPolicy.document.addStatements(
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        principals: [ new cdk.aws_iam.AnyPrincipal() ],
        actions: [ 's3:GetObject' ],
        resources: [ `${rootBucket.bucketArn}/*` ]
      })
    )

    // Www S3 Bucket (redirect www to root)
    const wwwBucket = new cdk.aws_s3.Bucket(this, 'WwwBucket', {
      bucketName: wwwDomain,
      accessControl: cdk.aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
      websiteRedirect: { hostName: rootDomain }
    })

    // 'Rewrite Urls' CloudFront Function
    const optionsRewriteUrls: cdk.aws_cloudfront.FileCodeOptions = { filePath: './cf-functions/rewrite-url.js' }
    const cffRewriteUrls = new cdk.aws_cloudfront.Function(this, 'FunctionRewriteUrls', {
      functionName: 'rewrite-url',
      code: cdk.aws_cloudfront.FunctionCode.fromFile(optionsRewriteUrls),
      comment: 'To rewrite requests based on url path.'
    })

    // 'Add Headers' CloudFront Function
    const optionsAddHeaders: cdk.aws_cloudfront.FileCodeOptions = { filePath: './cf-functions/add-header.js' }
    const cffAddHeaders = new cdk.aws_cloudfront.Function(this, 'FunctionAddHeaders', {
      functionName: 'add-header',
      code: cdk.aws_cloudfront.FunctionCode.fromFile(optionsAddHeaders),
      comment: 'To add custom headers to response.'
    })

    // Root Cloudfront Distribution
    const rootDistribution = new cdk.aws_cloudfront.Distribution(this, 'RootDistribution', {
      comment: 'The main distro for my personal website.',
      certificate: cert,
      defaultRootObject: 'index.html',
      domainNames: [ rootDomain ],
      minimumProtocolVersion: cdk.aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      enableLogging: true,
      logBucket: siteLogBucket,
      logFilePrefix: 'cf-root-access-logs',
      errorResponses: [{
        httpStatus: 403,
        responseHttpStatus: 403,
        responsePagePath: '/404.html',
        ttl: cdk.Duration.hours(24)
      }],
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(rootBucket),
        compress: true,
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [{
          function: cffRewriteUrls,
          eventType: cdk.aws_cloudfront.FunctionEventType.VIEWER_REQUEST
        }, {
          function: cffAddHeaders,
          eventType: cdk.aws_cloudfront.FunctionEventType.VIEWER_RESPONSE
        }]
      }
    })
    
    // Www Cloudfront Distribution
    const wwwDistribution = new cdk.aws_cloudfront.Distribution(this, 'WwwDistribution', {
      comment: 'The secondary distro for my personal website.',
      certificate: cert,
      defaultRootObject: 'index.html',
      domainNames: [ wwwDomain ],
      minimumProtocolVersion: cdk.aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      enableLogging: true,
      logBucket: siteLogBucket,
      logFilePrefix: 'cf-www-access-logs',
      errorResponses: [{
        httpStatus: 403,
        responseHttpStatus: 403,
        responsePagePath: '/404.html',
        ttl: cdk.Duration.hours(24)
      }],
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(wwwBucket),
        compress: true,
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      }
    })
    
    // Root Alias Record
    new cdk.aws_route53.ARecord(this, 'RootAliasRecord', {
      recordName: rootDomain,
      target: cdk.aws_route53.RecordTarget.fromAlias(new cdk.aws_route53_targets.CloudFrontTarget(rootDistribution)),
      zone
    })
    
    // Www Alias Record
    new cdk.aws_route53.ARecord(this, 'WwwAliasRecord', {
      recordName: wwwDomain,
      target: cdk.aws_route53.RecordTarget.fromAlias(new cdk.aws_route53_targets.CloudFrontTarget(wwwDistribution)),
      zone
    })
    
    // Outputs
    new cdk.CfnOutput(this, 'ZoneArn', { value: zone.hostedZoneArn })
    new cdk.CfnOutput(this, 'RootBucketArn', { value: rootBucket.bucketArn })
    new cdk.CfnOutput(this, 'WwwBucketArn', { value: wwwBucket.bucketArn })
    new cdk.CfnOutput(this, 'SiteLogBucketArn', { value: siteLogBucket.bucketArn })
    new cdk.CfnOutput(this, 'RootDistributionId', { value: rootDistribution.distributionId })
    new cdk.CfnOutput(this, 'WwwDistributionId', { value: wwwDistribution.distributionId })
  }
}

const app = new cdk.App()
const accountId = app.node.tryGetContext('accountId')
const region = 'us-east-1'
const domainName = 'derekbrown.io'
const domainCertArn = '5c5e1d1a-76a3-4c56-9ecc-26c7ab11bebb'

// Stack
class PersonalSiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Initialize Construct
    new PersonalSite(this, 'PersonalSite', { 
      account: accountId,
      region: region,
      domainName: domainName,
      domainCertArn: domainCertArn
    })
  }
}

// Initialize Stack
new PersonalSiteStack(app, 'PersonalSiteStack', {
  env: {
    account: accountId, 
    region: region
  }
})