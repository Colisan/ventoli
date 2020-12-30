export class PopupButton {
	public label: string;
	public action: Function;

	constructor(label: string, action: Function) {
		this.label = label;
		this.action = action;
	}
}

export class Popup {
	public title?: string;
	public content: string;
	public buttonList: Array<PopupButton>;

	constructor(content: string) {
		this.content = content;
		this.buttonList = [];
	}
}
