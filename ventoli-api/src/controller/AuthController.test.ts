/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as typeorm from 'typeorm';
import AuthController from './AuthController';
import Player from '../entity/Player';

chai.use(sinonChai);

describe('AuthController class', () => {
  it('can be instanciated without parameter', () => {
    const repo = { isFakeRepo: true };
    const getRepoSub = sinon.stub(typeorm, 'getRepository' as any).returns(repo);
    const authController = new AuthController();

    expect(authController.playerRepository).to.equal(repo);

    getRepoSub.restore();
  });

  it('can be instanciated with repository injection', () => {
    const repo = sinon.stub() as any;
    const authController = new AuthController(repo);

    expect(authController.playerRepository).to.equal(repo);
  });
});

describe('AuthController login method', () => {
  const authController = new AuthController(sinon.stub() as any);

  it('sends http 400 if credentials are incomplete', async () => {
    const req = mockReq({ body: {} });
    const res = mockRes();
    await authController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
  });

  it("sends http 401 credentials don't match", async () => {
    authController.playerRepository.findOneOrFail = sinon.stub().throws(new Error('Nobody hear you'));

    const req = mockReq({ body: { playername: 'Admin', password: '1234' } });
    const res = mockRes();
    await authController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);

    authController.playerRepository.findOneOrFail = undefined;
  });
});
