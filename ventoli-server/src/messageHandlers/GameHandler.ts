import WebSocket from 'ws';
import { Message, Type } from '../Protocol';
import { Game } from '@ventoli/ventoli-model';

export default class GameHandler {
	private webSocket: WebSocket;
	private gamesCache: Game[];

	constructor(webSocket: GameHandler['webSocket']) {
		this.webSocket = webSocket;
	}

	public handleMessage(message: Message) {
		switch (message.type) {
			case 'GET_GAME':
				break;
		}
	}
}
