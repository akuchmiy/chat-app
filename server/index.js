const server = require('./socket.io')
const path = require('path')
const mongoose = require('mongoose')
const mongoConfig = require('./config/mongoose.config')
require('dotenv').config({ path: path.resolve(__dirname + '/../.env.local') })

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_STRING, mongoConfig)
    server.listen(3000)
  } catch (e) {
    console.log(e)
  }
}

start()
