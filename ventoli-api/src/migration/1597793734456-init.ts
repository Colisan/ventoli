import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1597793734456 implements MigrationInterface {
	name = 'init1597793734456';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `player_orm` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_83a5afc99651cf8322113625d4` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP INDEX `IDX_83a5afc99651cf8322113625d4` ON `player_orm`');
		await queryRunner.query('DROP TABLE `player_orm`');
	}
}
