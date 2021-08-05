const http = require('http')
const app = require('../express')
const server = http.createServer(app)
const options = require('../config/io.config')
const onConnection = require('./handlers')

const io = require('socket.io')(server, options)

io.on('connection', onConnection)

module.exports = server
