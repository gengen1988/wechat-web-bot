const server = require('./lib/server')
const config = require('./lib/config')

server(config.port)
