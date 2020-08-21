import * as bcrypt from "bcryptjs";

export default class Player {
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}