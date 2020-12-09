import * as bcrypt from 'bcryptjs';

export default class Player {
	public id: number;

	private _name: string;

	private _hashedPassword: string;

	public createdAt: Date;

	public updatedAt: Date;

	public get name(): string {
		return this._name;
	}

	public set name(newName: string) {
		this._name = newName;
	}

	public set validName(newName: string) {
		if (newName.length < 5)
			throw "Name must be at least 5 characters long";
		if (newName.match(/\W/gmui))
			throw "Name must only contain letter or digit characters";
		this._name = newName;
	}

	public set clearPassword(newClearPassword: string) {
		this._hashedPassword = bcrypt.hashSync(newClearPassword, 8);
	}

	public set validClearPassword(newClearPassword: string) {
		if (newClearPassword.length < 8)
			throw "Password must be at least 8 characters long";
		if (!newClearPassword.match(/[a-z][A-Z]/gmui))
			throw "Password must contain a letter";
		if (!newClearPassword.match(/\d/gmui))
			throw "Password must contain a digit";
		if (!newClearPassword.match(/\W/gmui))
			throw "Password must contain a non-letter and non-digit character";
		this._hashedPassword = bcrypt.hashSync(newClearPassword, 8);
	}

	public set hashedPassword(newHashPassword: string) {
		this._hashedPassword = newHashPassword;
	}

	public get hashedPassword(): string {
		return this._hashedPassword;
	}

	public isClearPasswordEqual(clearPassword: string): boolean {
		return bcrypt.compareSync(clearPassword, this._hashedPassword);
	}
}
