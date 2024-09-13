const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['redirect'] = require('..\\middleware\\redirect.js')
middleware['redirect'] = middleware['redirect'].default || middleware['redirect']

export default middleware
