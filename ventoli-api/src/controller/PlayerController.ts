
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import Player from "../entity/Player";

class PlayerController {
  static findOneByName = async (req: Request, res: Response) => {
    const name: string = req.params.name;

    const playerRepository = getRepository(Player);
    try {
      const player = await playerRepository.findOneOrFail({
        select: [ 'id', 'name'],
        where: { 'name': name }
      });
      res.send(player);
    } catch (error) { res.status(404).send('Player not found'); }
  };

  static newPlayer = async (req: Request, res: Response) => {
    let { playername, password } = req.body;
    let player = new Player();
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
