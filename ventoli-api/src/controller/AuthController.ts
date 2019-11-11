import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import Player from '../entity/Player';
import JwtPayload from '../model/JwtPayload';

export default class AuthController {
  playerRepository: Repository<Player>;

  constructor(playerRepoInjection = getRepository(Player)) {
    this.playerRepository = playerRepoInjection;
  }

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
  async login(req: Request, res: Response) {
    const { playername, password } = req.body;
    if (!(playername && password)) {
      res.status(400).send();
      return;
    }

    let player: Player;
    try {
      player = await this.playerRepository.findOneOrFail({ where: { playername } });
    } catch (error) {
      res.status(401).send();
      return;
    }

    if (!player.isClearPasswordValid(password)) {
      res.status(401).send();
      return;
    }

    const payload = JwtPayload.fromPlayer(player);
    res.send(payload.getSignedToken());
  }
}
