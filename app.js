const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});

app.get('/ping', (req, res) => {
  res.send('PONG-Hello express')
})

module.exports = app
