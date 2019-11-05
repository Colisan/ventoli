import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import Player from "../entity/Player";
import config from "../../../config";

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    let { playername, password } = req.body;
    if (!(playername && password)) { res.status(400).send(); }

    const playerRepository = getRepository(Player);
    let player: Player;
    try {
      player = await playerRepository.findOneOrFail({ where: { playername } });
    } catch (error) { res.status(401).send(); }

    if (!player.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { player_id: player.id, playername: player.name },
      config.jwt_secret,
      { expiresIn: "1h" }
    );

    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    const player_id = res.locals.jwtPayload.playerId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get player from the database
    const playerRepository = getRepository(Player);
    let player: Player;
    try {
      player = await playerRepository.findOneOrFail(player_id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!player.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    player.password = newPassword;
    const errors = await validate(player);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    player.hashPassword();
    playerRepository.save(player);

    res.status(204).send();
  };
}
