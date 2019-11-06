import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['name'])
export default class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 50)
  name: string;

  @Column()
  @Length(8, 200)
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isClearPasswordValid(clearPassword: string) {
    return bcrypt.compareSync(clearPassword, this.password);
  }
}
