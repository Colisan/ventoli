/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import PlayerController from './PlayerController';
import PlayerORM from '../entity/PlayerORM';

chai.use(sinonChai);

describe('PlayerController findOneByName method', () => {
	// const playerController = new PlayerController(sinon.stub() as any);

	it('returns the player infos if found in database', async () => {
		const foundPlayer = new PlayerORM();
		foundPlayer.id = 111;
		foundPlayer.name = 'AnotherNoob';

		const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
			findOneOrFail: sinon.stub().returns(Promise.resolve(foundPlayer)),
		} as any);

		const req = mockReq({ params: 'AnotherNoob' });
		const res = mockRes();
		await PlayerController.findOneByName(req, res);

		expect(res.send).to.have.been.calledWith(foundPlayer);

		getRepoStub.restore();
	});

	it('sends http 404 if no player found in database', async () => {
		const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
			findOneOrFail: sinon.stub().throws('Nop nop'),
		} as any);

		const req = mockReq({ params: 'Nonoob' });
		const res = mockRes();
		await PlayerController.findOneByName(req, res);

		expect(res.status).to.have.been.calledWith(404);

		getRepoStub.restore();
	});
});

describe('PlayerController newPlayer method', () => {
	it('returns http 400 and a reason if entity validation fails', async () => {
		const validateStub = sinon.stub(PlayerORM.prototype, 'getValidationErrors');
		validateStub.returns(Promise.resolve(['Nope lol' as any]));

		const req = mockReq({
			body: { playername: 'OneStubMan', password: 'Mudamuda' },
		});
		const res = mockRes();
		await PlayerController.newPlayer(req, res);

		expect(res.status).to.have.been.calledWith(400);
		expect(res.send).to.have.been.calledWith(sinon.match.truthy);

		validateStub.restore();
	});

	it('hashes the password before calling save', async () => {
		const validateStub = sinon.stub(PlayerORM.prototype, 'getValidationErrors');
		validateStub.returns(Promise.resolve([]));

		const saveStub = sinon.stub().returns(new PlayerORM());
		const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
			save: saveStub,
		} as any);

		const clearPassword = 'HashMe';

		const req = mockReq({
			body: { playername: 'InnocentNoob', password: clearPassword },
		});
		const res = mockRes();
		await PlayerController.newPlayer(req, res);

		expect(saveStub).to.have.been.calledWith(
			sinon.match((player) => {
				return player.password != clearPassword;
			})
		);

		validateStub.restore();
		getRepoStub.restore();
	});

	it('returns http 409 if player already exists', async () => {
		const validateStub = sinon.stub(PlayerORM.prototype, 'getValidationErrors');
		validateStub.returns(Promise.resolve([]));

		const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
			save: sinon.stub().throws('Nopity nope'),
		} as any);

		const req = mockReq({
			body: { playername: 'TwoStubOneGirl', password: 'Mudamuda' },
		});
		const res = mockRes();
		await PlayerController.newPlayer(req, res);

		expect(res.status).to.have.been.calledWith(409);

		validateStub.restore();
		getRepoStub.restore();
	});

	it('returns http 201 if it all goes well', async () => {
		const validateStub = sinon.stub(PlayerORM.prototype, 'getValidationErrors');
		validateStub.returns(Promise.resolve([]));

		const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
			save: sinon.stub().returns(new PlayerORM()),
		} as any);

		const req = mockReq({
			body: { playername: 'FreshStub', password: '4llG00d' },
		});
		const res = mockRes();
		await PlayerController.newPlayer(req, res);

		expect(res.status).to.have.been.calledWith(201);

		validateStub.restore();
		getRepoStub.restore();
	});
});
