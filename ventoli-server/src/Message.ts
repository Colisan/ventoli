type TypeAndPayload = {
	PING: Date;
	PONG: Date;
};

export class Message {
	public type: keyof TypeAndPayload;
	public payload: TypeAndPayload[keyof TypeAndPayload];
}
