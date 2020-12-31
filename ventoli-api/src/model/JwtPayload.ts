import * as jwt from 'jsonwebtoken';
import { Player } from '../../../ventoli-model/dist';
import PlayerORM from '../entity/PlayerORM';

interface PayloadData {
	playerid?: number;
	playername?: string;
}

export default class JwtPayload {
	public datas: PayloadData;
	public noExpiration: boolean;

	constructor(datas?: any, noExpiration: boolean = false) {
		if (datas) this.datas = datas as PayloadData;
		else
			this.datas = {
				playerid: undefined,
				playername: undefined,
			};
		this.noExpiration = noExpiration;
	}

	public getSignedToken(): string {
		let secret = process.env.JWT_SECRET;
		if (secret) return jwt.sign(this.datas, secret, this.noExpiration ? {} : { expiresIn: '1h' });
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
