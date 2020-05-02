import express from 'express'
import path from 'path'

const server = express()

server.use(express.static(path.join(__dirname, 'client', 'build')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});

server.get('/ping', (req, res) => {
  res.send('PONG-Hello express')
})

export  default server

