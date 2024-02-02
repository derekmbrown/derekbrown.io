function handler(event) {
  var request = event.request
  var uri = request.uri

  if (uri.endsWith('/')) { request.uri = '/index.html' }
  if (uri.endsWith('/about')) { request.uri = '/about/index.html' }
  if (uri.endsWith('/tags')) { request.uri = '/tags/index.html' }

  var pathNames = uri.split('/')
  if (pathNames.length > 2 && (pathNames[1] == 'notes' || pathNames[1] == 'tags')) {
    request.uri = `/${pathNames[1]}/${pathNames[2]}/index.html`
  }

  return request
}