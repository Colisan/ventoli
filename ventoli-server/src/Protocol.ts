import WebSocket from 'ws';

export type TypeAndPayload = {
	HELLO: void;
	PING: Date;
	PONG: Date;
	GET_GAME: void;
};

export type Type = keyof TypeAndPayload;

export class TypedMessage<T extends Type> {
	public type: T;
	public payload: TypeAndPayload[T];
	public jwtToken: string | undefined;

	constructor(type: TypedMessage<T>['type'], payload: TypedMessage<T>['payload']) {
		this.type = type;
		this.payload = payload;
	}
}

export type Message = TypedMessage<Type>;

export function onMessage(webSocket: WebSocket, callback: (_: Message) => any): void {
	webSocket.on('message', (stringifiedMessage) => {
		let message: Message;
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

export function sendMessage(webSocket: WebSocket, message: Message) {
	webSocket.send(JSON.stringify(message));
}
