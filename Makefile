build:
	npm run build

deploy:
	cd cdk && cdk deploy -c accountId=${AWS_ACCOUNT_ID}

diff:
	cd cdk && cdk diff -c accountId=${AWS_ACCOUNT_ID}

list:
	cd cdk && cdk ls -c accountId=${AWS_ACCOUNT_ID}

purge:
	aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_DIST_ID} --paths '/*' --no-cli-pager

reset:
	make reset_astro
	make reset_cdk

reset_astro:
	rm -rf node_modules && npm i

reset_cdk:
	cd cdk && rm -rf node_modules && npm i

sync:
	aws s3 sync ./dist s3://derekbrown.io

synth:
	cd cdk && cdk synth -q -c accountId=${AWS_ACCOUNT_ID}

up:
	npm run dev

upload:
	make build
	make sync
	make purge