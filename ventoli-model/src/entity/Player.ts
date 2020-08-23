import { Length, validate, ValidationError } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export default class Player {
	public id!: number;

	@Length(4, 50)
	public name!: string;

	@Length(8, 200)
	public password!: string;

	public createdAt!: Date;

	public updatedAt!: Date;

	public hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	public isClearPasswordValid(clearPassword: string): boolean {
		return bcrypt.compareSync(clearPassword, this.password);
	}

	public async getValidationErrors(): Promise<ValidationError[]> {
		return await validate(this);
	}
}
