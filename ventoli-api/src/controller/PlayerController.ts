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
   *     description: Find a player's public informations
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: playername
   *         description: Username to search for.
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Here it is!
   *       404:
   *         description: Player not found
   */
  static findOneByName = async (req: Request, res: Response) => {
    const { name } = req.params;

    const playerRepository = getRepository(Player);
    try {
      const player = await playerRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { name },
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
   *     description: Register a new player
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: playername
   *         description: Username to register.
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *         description: It's all done!
   *       400:
   *         description: Credentials don't respect constraints
   *       409:
   *         description: Username not avaliable
   */
  static newPlayer = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    console.log(req);
    console.log('creating name : ', name);
    console.log('creating password : ', password);
    const player = new Player();
    player.name = name;
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
