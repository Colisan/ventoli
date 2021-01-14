import WebSocket from 'ws';

export type TypeAndPayload = {
	HELLO: void;
	PING: Date;
	PONG: Date;
};

export class Message<T extends keyof TypeAndPayload> {
	public type: T;
	public payload: TypeAndPayload[T];

	constructor(type: Message<T>['type'], payload: Message<T>['payload']) {
		this.type = type;
		this.payload = payload;
	}
}

export function onMessage(webSocket: WebSocket, callback: (_: Message<any>) => any): void {
	webSocket.on('message', (stringifiedMessage) => {
		let message: Message<any>;
		let isParsingOk = false;
		try {
			message = JSON.parse(stringifiedMessage as string);
			isParsingOk = true;
		} catch (_) {}

		if (isParsingOk) {
			callback(message);
		}
	});
}

export function sendMessage(webSocket: WebSocket, message: Message<any>) {
	webSocket.send(JSON.stringify(message));
}
