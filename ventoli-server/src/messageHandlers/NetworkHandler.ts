import WebSocket from 'ws';
import { Message, sendMessage, TypeAndPayload } from '../Protocol';
import GameHandler from './GameHandler';

export default class NetworkHandler {
	private webSocket: WebSocket;

	constructor(webSocket: GameHandler['webSocket']) {
		this.webSocket = webSocket;
	}

	public handleMessage(message: Message<any>) {
		switch (message.type as keyof TypeAndPayload) {
			case 'PING':
				this.respondToPing(message);
				break;
		}
	}

	private respondToPing(message: Message<'HELLO'>) {
		sendMessage(this.webSocket, new Message('PONG', new Date()));
	}
}
