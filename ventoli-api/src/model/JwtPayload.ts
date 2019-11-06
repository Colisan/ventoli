import * as jwt from 'jsonwebtoken';
import Player from '../entity/Player';
import config from '../../../config';

export default class JwtPayload {
  playerid: number;

  playername: string;

  constructor(player: Player) {
    this.playerid = player.id;
    this.playername = player.name;
  }

  public sign(): string {
    return jwt.sign(
      {
        playerid: this.playerid,
        playername: this.playername,
      },
      config.jwt_secret,
      { expiresIn: '1h' }
    );
  }
}
