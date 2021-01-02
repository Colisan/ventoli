import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Player } from '@ventoli/ventoli-model';

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

	public constructor(
		id: PlayerORM['id'],
		name: PlayerORM['name'],
		hashedPassword: PlayerORM['password'],
		createdAt: PlayerORM['createdAt'],
		updatedAt: PlayerORM['updatedAt']
	) {
		this.id = id;
		this.name = name;
		this.password = hashedPassword;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static fromPlayerModel(playerModel?: Player) {
		return new PlayerORM(
			playerModel.id,
			playerModel.name,
			playerModel.hashedPassword,
			playerModel.createdAt,
			playerModel.updatedAt
		);
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
