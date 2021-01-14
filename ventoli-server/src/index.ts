import WebSocket from 'ws';
import GameHandler from './messageHandlers/GameHandler';
import NetworkHandler from './messageHandlers/NetworkHandler';
import { onMessage } from './Protocol';

const webSocketServer = new WebSocket.Server({ port: 4000 });

webSocketServer.on('connection', (webSocket) => {
	webSocket.send('Hello! Message From Server!');

	const networkHandler = new NetworkHandler(webSocket);
	const gameHandler = new GameHandler(webSocket);

	onMessage(webSocket, (message) => {
		console.log(`${message.type} message recieved: ${JSON.stringify(message.payload)}`);
		networkHandler.handleMessage(message);
		gameHandler.handleMessage(message);
	});
});
