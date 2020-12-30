import * as jwt from 'jsonwebtoken';
import { Player } from '../../../ventoli-model/dist';
import PlayerORM from '../entity/PlayerORM';

interface PayloadData {
	playerid?: number;
	playername?: string;
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
		let secret = process.env.JWT_SECRET;
		if (secret) return jwt.sign(this.datas, secret, { expiresIn: '1h' });
		else throw 'No JWT_SECRET found in ENV';
	}

	static fromPlayer(player: Player) {
		const res = new JwtPayload();
		res.datas.playerid = player.id;
		res.datas.playername = player.name;
		return res;
	}

	static fromSignedToken(token: string): JwtPayload {
		let secret = process.env.JWT_SECRET;
		if (secret) return new JwtPayload(jwt.verify(token, secret) as PayloadData);
		else throw 'No JWT_SECRET found in ENV';
	}
}
