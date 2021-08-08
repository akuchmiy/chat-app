const http = require('http')
const app = require('../express')
const server = http.createServer(app)
const options = require('../config/io.config')
const registerOnConnection = require('./handlers/on-connection')

const io = require('socket.io')(server, options)

io.on('connection', registerOnConnection(io))

module.exports = {server, io}
