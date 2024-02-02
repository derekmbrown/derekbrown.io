function handler(event) {
  var response = event.response
  var headers = response.headers
  var clientIp = event.viewer.ip

  headers['cache-control'] = { value: 'public, max-age=8640' }
  headers['x-app'] = { value: 'astro' }
  headers['x-client-ip'] = { value: clientIp }

  return response
}