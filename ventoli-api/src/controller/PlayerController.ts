import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Player } from '../../../ventoli-model/dist';

import PlayerORM from '../entity/PlayerORM';

export default class PlayerController {
  /**
   * @swagger
   *
   * definitions:
   *   PlayerController_findOneByName:
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: playername
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Here it is!
   *       404:
   *         description: Player not found
   */
  public static async findOneByName(req: Request, res: Response) {
    const { playername } = req.params;
		
		console.log('findOneByName', playername);

    const playerRepository = getRepository(PlayerORM);

    try {
      const player = await playerRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { name: playername },
      });
      res.send(player);
    } catch (error) {
      res.status(404).send('Player not found');
    }
	}
	
  /**
   * @swagger
   *
   * definitions:
   *   PlayerController_findSelf:
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Here you are!
   *       401:
   *         description: Player isn't you
   *       404:
   *         description: Player not found
   */
  public static async findSelf(req: Request, res: Response) {
    const playerRepository = getRepository(PlayerORM);

		const playername = res.locals.jwtPayload.datas.playername;

    try {
      const player = await playerRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { name: playername },
      });
      res.send(player);
    } catch (error) {
      res.status(404).send('Player not found');
			return;
    }
  }

  /**
   * @swagger
   *
   * definitions:
   *   PlayerController_newPlayer:
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
   *       201:
   *         description: It's all done!
   *       400:
   *         description: Credentials don't respect constraints
   *       409:
   *         description: Username not avaliable
   */
  public static async newPlayer(req: Request, res: Response) {
    const { playername, password } = req.body;
		const player = new Player();
		
		try {
			player.validName = playername;
			player.validClearPassword = password;
		}
		catch (error) {
      res.status(400).send(error.toString());
      return;
    }

		const playerRepository = getRepository(PlayerORM);
		const playerEntity = new PlayerORM(player);

    try {
      await playerRepository.save(playerEntity);
    } catch (e) {
      res.status(409).send('Playername already in use');
      return;
    }

    res.status(201).send('Player created');
  }

  /**
   * @swagger
   *
   * definitions:
   *   PlayerController_editPlayer:
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               password:
   *                 type: string
   *             required:
   *               - id
   *               - password
   *     responses:
   *       201:
   *         description: It's all done!
   *       400:
   *         description: Credentials don't respect constraints
   *       401:
   *         description: Old password is incorrect
   *       409:
   *         description: Username not avaliable
   */
  public static async editPlayer(req: Request, res: Response) {
    const { id, oldPassword, newPassword } = req.body;
		const playerRepository = getRepository(PlayerORM);
		
		let playerEntity: PlayerORM;

    try {
      playerEntity = await playerRepository.findOneOrFail({
        select: ['id', 'name', 'password'],
        where: { id: id },
      });
    } catch (error) {
      res.status(404).send('Player not found');
      return;
		}
		
		const player = new Player();

		player.hashedPassword = playerEntity.password;
		
		if (!player.isClearPasswordEqual(oldPassword)) {
			res.status(401).send('Old password is incorrect');
			return;
		}

		try {
			player.validClearPassword = newPassword;
		}
		catch (error) {
      res.status(400).send(error.toString());
      return;
    }

		playerEntity.password = player.hashedPassword

    try {
      await playerRepository.update(playerEntity.id, playerEntity);
    } catch (e) {
      res.status(409).send('Error saving credentials');
      return;
    }

    res.status(201).send('Player edited');
  }
}
