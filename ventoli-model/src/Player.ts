import { Length, validate } from "class-validator";
import * as bcrypt from "bcryptjs";

export default class Player {
  id!: number;

  @Length(4, 50)
  name!: string;

  @Length(8, 200)
  password!: string;

  createdAt!: Date;

  updatedAt!: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isClearPasswordValid(clearPassword: string) {
    return bcrypt.compareSync(clearPassword, this.password);
  }

  async getValidationErrors() {
    return await validate(this);
  }
}
