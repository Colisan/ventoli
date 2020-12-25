import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Player } from '../../../ventoli-model/dist';

import PlayerORM from '../entity/PlayerORM';
import JwtPayload from '../model/JwtPayload';

export default class AuthController {
	/**
	 * @swagger
	 *
	 * definitions:
	 *   AuthController_login:
	 *     description: Login to the application
	 *     produces:
	 *       - application/json
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               playername:
	 *                 type: string
	 *               password:
	 *                 type: string
	 *             required:
	 *               - playername
	 *               - password
	 *     responses:
	 *       200:
	 *         description: You're good to go!
	 *       400:
	 *         description: Missing parameters
	 *       401:
	 *         description: Wrong username or password
	 */
	public static async login(req: Request, res: Response) {
		const { playername, password } = req.body;
		if (!(playername && password)) {
			res.status(400).send();
			return;
		}

		const playerRepository = getRepository(PlayerORM);

		let playerEntity: PlayerORM;

		try {
			playerEntity = await playerRepository.findOneOrFail({
				where: { name: playername },
			});
		} catch (error) {
			res.status(401).send('Unknown playername' + error.toString());
			return;
		}

		let player: Player = playerEntity.toPlayerModel();

		if (!player.isClearPasswordEqual(password)) {
			res.status(401).send('Invalid password');
			return;
		}

		const payload = JwtPayload.fromPlayer(player);
		res.send(payload.getSignedToken());
	}
}
