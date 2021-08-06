const express = require('express')
const path = require('path')
const auth = require('./routes/auth/auth.router')
const rooms = require('./routes/rooms/room.router')

const app = express()

const staticDir = path.resolve(__dirname, '../../dist')

app.use(express.json())
app.use(express.static(staticDir))
app.use('/auth', auth)
app.use('/rooms', rooms)

app.get('/', (req, res) => {
  res.status(200).sendFile(staticDir, (err) => {
    console.log(err)
  })
})

module.exports = app
