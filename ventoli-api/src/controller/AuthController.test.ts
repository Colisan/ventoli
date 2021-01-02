/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as typeorm from 'typeorm';
import JwtPayload from '../model/JwtPayload';
import AuthController from './AuthController';
import PlayerORM from '../entity/PlayerORM';

chai.use(sinonChai);

describe('AuthController', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('login method', () => {
		it('sends http 400 if credentials are incomplete', async () => {
			const req = mockReq({ body: {} });
			const res = mockRes();
			await AuthController.login(req, res);

			expect(res.status).to.have.been.calledWith(400);
		});

		it("sends http 401 playername don't exist in db", async () => {
			sandbox.stub(typeorm, 'getRepository').returns({
				findOneOrFail: sandbox.stub().throws(new Error('Nobody hear you')),
			} as any);

			const req = mockReq({ body: { playername: 'Admin', password: '1234' } });
			const res = mockRes();
			await AuthController.login(req, res);

			expect(res.status).to.have.been.calledWith(401);
		});

		it("sends http 401 password don't match", async () => {
			const foundPlayer = new PlayerORM(0, '', '', new Date(), new Date());
			foundPlayer.id = 123;
			foundPlayer.name = 'NotTheAdmin';
			foundPlayer.password = 'th3Passw0rd';

			sandbox.stub(typeorm, 'getRepository').returns({
				findOneOrFail: sandbox.stub().returns(foundPlayer),
			} as any);

			const req = mockReq({
				body: { playername: foundPlayer.name, password: 'n0tTh3Passw0rd' },
			});
			const res = mockRes();
			await AuthController.login(req, res);

			expect(res.status).to.have.been.calledWith(401);
		});

		it('sends token if auth successful', async () => {
			const foundPlayer = new PlayerORM(0, '', '', new Date(), new Date());
			foundPlayer.id = 123;
			foundPlayer.name = 'StillNot';
			const clearPassword = 'zer0zer0';
			foundPlayer.password = clearPassword;

			sandbox.stub(typeorm, 'getRepository').returns({
				findOneOrFail: sandbox.stub().returns(foundPlayer),
			} as any);

			//const fakeToken = 'signedT0ken';
			//const tokenStub = sandbox.stub(JwtPayload.prototype, 'getSignedToken').returns(fakeToken);

			const req = mockReq({
				body: { playername: foundPlayer.name, password: clearPassword },
			});
			const res = mockRes();
			await AuthController.login(req, res);

			//expect(tokenStub).to.have.been.called;
			//expect(res.send).to.have.been.calledWith(fakeToken);
			expect(res.send).to.have.been.calledWith(sinon.match.truthy);
		});
	});
});
