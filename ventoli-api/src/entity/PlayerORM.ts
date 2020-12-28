import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Player } from '../../../ventoli-model/dist';

@Entity()
@Unique(['name'])
export default class PlayerORM {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column()
	public name!: string;

	@Column()
	public password!: string;

	@Column()
	@CreateDateColumn()
	public createdAt!: Date;

	@Column()
	@UpdateDateColumn()
	public updatedAt!: Date;

	public constructor(playerModel?: Player) {
		if (playerModel) {
			this.id = playerModel.id;
			this.name = playerModel.name;
			this.password = playerModel.hashedPassword;
			this.createdAt = playerModel.createdAt;
			this.updatedAt = playerModel.updatedAt;
		}
	}

	public toPlayerModel(): Player {
		let playerModel = new Player();
		playerModel.id = this.id;
		playerModel.name = this.name;
		playerModel.hashedPassword = this.password;
		playerModel.createdAt = this.createdAt;
		playerModel.updatedAt = this.updatedAt;
		return playerModel;
	}
}
