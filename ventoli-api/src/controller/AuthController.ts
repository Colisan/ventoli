import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Player from '../entity/Player';
import JwtPayload from '../model/JwtPayload';

export default class AuthController {
  /**
   * @swagger
   *
   * definitions:
   *   AuthController_Login:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: playername
   *         description: Username to use for login.
   *         in: body
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: body
   *         required: true
   *         type: string
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
