import WebSocket from 'ws';
import { Message } from '../Protocol';

export default class GameHandler {
	private webSocket: WebSocket;

	constructor(webSocket: GameHandler['webSocket']) {
		this.webSocket = webSocket;
	}

	public handleMessage(message: Message<any>) {}
}
