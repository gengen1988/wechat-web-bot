const express = require('express')
const cors = require('cors')

const chat = require('./chat')
const config = require('./config')


module.exports = function (port) {
  const app = express()
  app.use(cors())
  app.get('/:message', messageHandler)
  app.listen(port)
}

const sendMessage = chat(config.apiKey, 'user1')

function messageHandler(req, res) {
  const message = req.params.message
  sendMessage(message)
    .then(reply => res.send(reply))
    .catch(err => res.next(err))
}
