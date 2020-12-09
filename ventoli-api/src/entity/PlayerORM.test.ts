/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import PlayerORM from './PlayerORM';

chai.use(sinonChai);
/*
describe('Player entity', () => {
  it('is instanciable', () => {
    const player = new PlayerORM();
    expect(player).not.to.be.undefined;
    expect(player).not.to.be.null;
  });

  it('can hash its password', () => {
    const player = new PlayerORM();
    const initialPassword = 'p4ssw0rd';
    player.password = initialPassword;
    expect(player.password).to.have.length.greaterThan(0);
    expect(player.password).not.to.equal(initialPassword);
  });

  it('can validate a clear password', () => {
    const player = new PlayerORM();
    const initialPassword = 't0p.s3cr3t';
    player.password = initialPassword;
    expect(player.isClearPasswordEqual(initialPassword)).to.be.true;
    expect(player.isClearPasswordEqual('another password')).to.be.false;
  });
});
*/