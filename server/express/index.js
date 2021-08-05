const express = require('express')
const path = require('path')

const app = express()

const staticDir = path.resolve(__dirname, '../../dist')

app.use(express.static(staticDir))

app.get('/', (req, res) => {
  res.sendFile(staticDir, (err) => {
    console.log(err)
  })
})

module.exports = app
