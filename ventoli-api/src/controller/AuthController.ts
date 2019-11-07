import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Player from '../entity/Player';
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
  static login = async (req: Request, res: Response) => {
    const { playername, password } = req.body;
    if (!(playername && password)) {
      res.status(400).send();
    }

    const playerRepository = getRepository(Player);
    let player: Player;
    try {
      player = await playerRepository.findOneOrFail({ where: { playername } });
    } catch (error) {
      res.status(401).send();
    }

    if (!player.isClearPasswordValid(password)) {
      res.status(401).send();
      return;
    }

    const payload = new JwtPayload(player);
    res.send(payload.sign());
  };
}
