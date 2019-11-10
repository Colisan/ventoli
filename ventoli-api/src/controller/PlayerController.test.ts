/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import PlayerController from './PlayerController';
import Player from '../entity/Player';
import { ValidationError } from 'class-validator';

chai.use(sinonChai);

describe('PlayerController class', () => {
  it('can be instanciated without parameter', () => {
    const repo = { isFakeRepo: true };
    sinon.stub(typeorm, 'getRepository' as any).returns(repo);
    const playerController = new PlayerController();

    expect(playerController.playerRepository).to.equal(repo);
  });

  it('can be instanciated with repository injection', () => {
    const repo = sinon.stub() as any;
    const playerController = new PlayerController(repo);

    expect(playerController.playerRepository).to.equal(repo);
  });
});

describe('PlayerController findOneByName method', () => {
  const playerController = new PlayerController(sinon.stub() as any);

  it('returns the player infos if found in database', async () => {
    const foundPlayer = new Player();
    foundPlayer.id = 111;
    foundPlayer.name = 'AnotherNoob';

    playerController.playerRepository.findOneOrFail = sinon.stub().returns(Promise.resolve(foundPlayer));

    const req = mockReq({ params: 'AnotherNoob' });
    const res = mockRes();
    await playerController.findOneByName(req, res);

    expect(res.send).to.have.been.calledWith(foundPlayer);

    playerController.playerRepository.findOneOrFail = undefined;
  });

  it('sends http 404 if no player found in database', async () => {
    playerController.playerRepository.findOneOrFail = sinon.stub().throws('Nop nop');

    const req = mockReq({ params: 'Nonoob' });
    const res = mockRes();
    await playerController.findOneByName(req, res);

    expect(res.status).to.have.been.calledWith(404);

    playerController.playerRepository.findOneOrFail = undefined;
  });
});

describe('PlayerController newPlayer method', () => {
  const playerController = new PlayerController(sinon.stub() as any);

  it('returns http 400 and a reason if entity validation fails', async () => {
    const validateStub = sinon.stub(classValidator, 'validate');
    validateStub.returns(Promise.resolve(['Nope lol' as any]));

    const req = mockReq({ body: { playername: 'OneStubMan', password: 'Mudamuda' } });
    const res = mockRes();
    await playerController.newPlayer(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.have.been.calledWith(sinon.match.truthy);

    validateStub.restore();
  });
});
