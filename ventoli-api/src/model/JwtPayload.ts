import * as jwt from 'jsonwebtoken';
import PlayerORM from '../entity/PlayerORM';
import * as config from '../../config.js';

interface PayloadData {
  playerid: number;
  playername: string;
}

export default class JwtPayload {
  datas: PayloadData;

  constructor(datas?: any) {
    if (datas) this.datas = datas as PayloadData;
    else
      this.datas = {
        playerid: undefined,
        playername: undefined,
      };
  }

  public getSignedToken(): string {
    return jwt.sign(this.datas, config.jwt_secret, { expiresIn: '1h' });
  }

  static fromPlayer(player: PlayerORM) {
    const res = new JwtPayload();
    res.datas.playerid = player.id;
    res.datas.playername = player.name;
    return res;
  }

  static fromSignedToken(token: string) {
    return new JwtPayload(jwt.verify(token, config.jwt_secret) as PayloadData);
  }
}
