const express = require('express')
const path = require('path')
const auth = require('./routes/auth/auth.router')
const rooms = require('./routes/rooms/rooms.router')
const users = require('./routes/users/users.router')

const app = express()
app.use(express.json())

const staticDir = path.resolve(__dirname, '../../dist')
app.use(express.static(staticDir))

app.use('/auth', auth)
app.use('/rooms', rooms)
app.use('/users', users)

app.get('/', (req, res) => {
  res.status(200).sendFile(staticDir, (err) => {
    console.log(err)
  })
})

module.exports = app
