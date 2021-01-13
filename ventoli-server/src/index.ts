import WebSocket from 'ws';

const webSocketServer = new WebSocket.Server({ port: 4000 });

webSocketServer.on('connection', (webSocket) => {
	webSocket.on('message', (message) => {
		console.log(`Received message: ${message}`);
		if (message === 'ping') {
			webSocket.send('pong');
		}
	});
	webSocket.send('Hello! Message From Server!');
});
