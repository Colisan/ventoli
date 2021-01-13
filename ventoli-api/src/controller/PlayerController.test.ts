/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import PlayerController from './PlayerController';
import PlayerORM from '../entity/PlayerORM';
import { Player } from '@ventoli/ventoli-model';

chai.use(sinonChai);

describe('PlayerController', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('findOneByName method', () => {
		// const playerController = new PlayerController(sinon.stub() as any);

		it('returns the player infos if found in database', async () => {
			const foundPlayer = new PlayerORM(0, '', '', new Date(), new Date());
			foundPlayer.id = 111;
			foundPlayer.name = 'AnotherNoob';

			sandbox.stub(typeorm, 'getRepository').returns({
				findOneOrFail: sandbox.stub().returns(Promise.resolve(foundPlayer)),
			} as any);

			const req = mockReq({ params: 'AnotherNoob' });
			const res = mockRes();
			await PlayerController.findOneByName(req, res);

			expect(res.send).to.have.been.calledWith(foundPlayer);
		});

		it('sends http 404 if no player found in database', async () => {
			sandbox.stub(typeorm, 'getRepository').returns({
				findOneOrFail: sandbox.stub().throws('Nop nop'),
			} as any);

			const req = mockReq({ params: 'Nonoob' });
			const res = mockRes();
			await PlayerController.findOneByName(req, res);

			expect(res.status).to.have.been.calledWith(404);
		});
	});

	describe('newPlayer method', () => {
		it('returns http 400 and a reason if entity validation fails', async () => {
			sandbox.stub(Player.prototype, 'validClearPassword').throws('Not lol');

			const req = mockReq({
				body: { playername: 'OneStubMan', password: 'Mudamuda' },
			});
			const res = mockRes();
			await PlayerController.newPlayer(req, res);

			expect(res.status).to.have.been.calledWith(400);
			expect(res.send).to.have.been.calledWith(sinon.match.truthy);
		});

		it('hashes the password before calling save', async () => {
			const saveStub = sinon.stub().resolves();
			const getRepoStub = sinon.stub(typeorm, 'getRepository').returns({
				save: saveStub,
			} as any);

			const clearPassword = 'HashMe66...';

			const req = mockReq({
				body: { playername: 'InnocentNoob', password: clearPassword },
			});
			const res = mockRes();
			await PlayerController.newPlayer(req, res);

			expect(getRepoStub).to.have.been.called;
			expect(saveStub).to.have.been.calledWith(
				sinon.match((playerEntity) => {
					return playerEntity.password != clearPassword;
				})
			);

			getRepoStub.restore();
		});

		it('returns http 409 if player already exists', async () => {
			sandbox.stub(typeorm, 'getRepository').returns({
				save: sandbox.stub().throws('Nopity nope'),
			} as any);

			const req = mockReq({
				body: { playername: 'TwoStubOneGirl', password: 'Mudamuda33.' },
			});
			const res = mockRes();
			await PlayerController.newPlayer(req, res);

			expect(res.status).to.have.been.calledWith(409);
		});

		it('returns http 201 if it all goes well', async () => {
			sandbox.stub(typeorm, 'getRepository').returns({
				save: sandbox.stub().returns(new PlayerORM(0, '', '', new Date(), new Date())),
			} as any);

			const req = mockReq({
				body: { playername: 'FreshStub', password: '4llG00d..' },
			});
			const res = mockRes();
			await PlayerController.newPlayer(req, res);

			expect(res.status).to.have.been.calledWith(201);
		});
	});
});
