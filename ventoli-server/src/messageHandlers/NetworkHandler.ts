import WebSocket from 'ws';
import { Message, sendMessage, Type, TypeAndPayload, TypedMessage } from '../Protocol';
import GameHandler from './GameHandler';

export default class NetworkHandler {
	private webSocket: WebSocket;

	constructor(webSocket: GameHandler['webSocket']) {
		this.webSocket = webSocket;
	}

	public handleMessage(message: Message) {
		switch (message.type as Type) {
			case 'PING':
				this.respondToPing(message as TypedMessage<'PING'>);
				break;
		}
	}

	private respondToPing(message: TypedMessage<'PING'>) {
		sendMessage(this.webSocket, new TypedMessage('PONG', new Date()));
	}
}
