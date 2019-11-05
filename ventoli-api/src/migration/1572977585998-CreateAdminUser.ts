import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import Player from "../entity/Player";
import config from '../../../config'

export class CreateAdminPlayer1572977585998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let player = new Player();
        player.name = config.admin_login;
        player.password = config.admin_password;
        player.hashPassword();
        const playerRepository = getRepository(Player);
        await playerRepository.save(player);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
