import WebSocket from 'ws'
 
const webSocketServer = new WebSocket.Server({ port: 8080 })
 
webSocketServer.on('connection', webSocket => {
	webSocket.on('message', message => {
    console.log(`Received message: ${message}`)
  })
  webSocket.send('Hello! Message From Server!!')
})