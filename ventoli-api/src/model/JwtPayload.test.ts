/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import JwtPayload from './JwtPayload';
import PlayerORM from '../entity/PlayerORM';
import { Player } from '@ventoli/ventoli-model';

chai.use(sinonChai);

describe('JwtPayload class', () => {
	it('is instanciable without datas', () => {
		const payload = new JwtPayload();
		expect(payload).not.to.be.undefined;
		expect(payload).not.to.be.null;
	});

	it('is instanciable with datas', () => {
		const datas = {
			playerid: 666,
			playername: 'Overlord73',
		};
		const payload = new JwtPayload(datas);
		expect(payload).not.to.be.undefined;
		expect(payload).not.to.be.null;
		expect(payload.datas.playerid).to.equal(datas.playerid);
		expect(payload.datas.playername).to.equal(datas.playername);
	});

	it('computes a signed token', () => {
		const datas = {
			playerid: 666,
			playername: 'Overlord73',
		};
		const payload = new JwtPayload(datas);
		const token = payload.getSignedToken();
		expect(token).to.have.length.greaterThan(0);
	});

	it('can be instanciated from Player Entity', () => {
		const player = new Player();
		player.id = 777;
		player.name = 'Jack Pott';
		const payload = JwtPayload.fromPlayer(player);
		expect(payload.datas.playerid).to.equal(player.id);
		expect(payload.datas.playername).to.equal(player.name);
	});

	it('can be instanciated from a valid token', () => {
		const datas = {
			playerid: 999,
			playername: '37drolrevO',
		};
		const payload = new JwtPayload(datas);
		const token = payload.getSignedToken();
		const newPayload = JwtPayload.fromSignedToken(token);
		expect(newPayload.datas.playerid).to.equal(datas.playerid);
		expect(newPayload.datas.playername).to.equal(datas.playername);
	});

	it('throw an error when instanciating from an invalid token', () => {
		expect(() => JwtPayload.fromSignedToken("that's not a jwt token...")).to.throw;
	});
});
