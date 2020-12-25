import * as jwt from 'jsonwebtoken';
import { Player } from '../../../ventoli-model/dist';
import PlayerORM from '../entity/PlayerORM';

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
		return jwt.sign(this.datas, process.env.JWT_SECRET, { expiresIn: '1h' });
	}

	static fromPlayer(player: Player) {
		const res = new JwtPayload();
		res.datas.playerid = player.id;
		res.datas.playername = player.name;
		return res;
	}

	static fromSignedToken(token: string) {
		return new JwtPayload(
			jwt.verify(token, process.env.JWT_SECRET) as PayloadData
		);
	}
}
