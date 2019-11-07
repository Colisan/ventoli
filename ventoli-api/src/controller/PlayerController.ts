import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import Player from '../entity/Player';

class PlayerController {
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
  static findOneByName = async (req: Request, res: Response) => {
    console.log(req, req.params);
    const { playername } = req.params;

    const playerRepository = getRepository(Player);
    try {
      const player = await playerRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { name: playername },
      });
      res.send(player);
    } catch (error) {
      res.status(404).send('Player not found');
    }
  };

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
  static newPlayer = async (req: Request, res: Response) => {
    const { playername, password } = req.body;
    const player = new Player();
    player.name = playername;
    player.password = password;

    const errors = await validate(player);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    player.hashPassword();

    const playerRepository = getRepository(Player);
    try {
      await playerRepository.save(player);
    } catch (e) {
      res.status(409).send('playername already in use');
      return;
    }

    res.status(201).send('Player created');
  };
}

export default PlayerController;
