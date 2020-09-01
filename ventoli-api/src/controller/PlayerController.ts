import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

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
    const player = new PlayerORM();
    player.name = playername;
    player.password = password;

		const errors = await player.getValidationErrors();
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    player.hashPassword();

    const playerRepository = getRepository(PlayerORM);

    try {
      await playerRepository.save(player);
    } catch (e) {
      res.status(409).send('Playername already in use');
      return;
    }

    res.status(201).send('Player created');
  }
}
