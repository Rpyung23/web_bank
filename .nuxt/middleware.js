const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['redirect'] = require('..\\middleware\\redirect.js')
middleware['redirect'] = middleware['redirect'].default || middleware['redirect']

middleware['remove'] = require('..\\middleware\\remove.js')
middleware['remove'] = middleware['remove'].default || middleware['remove']

export default middleware
