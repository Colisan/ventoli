/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Player from './Player';

chai.use(sinonChai);

describe('Player entity', () => {
	it('is instanciable', () => {
		const player = new Player();
		expect(player).not.to.be.undefined;
		expect(player).not.to.be.null;
	});

	it('can hash its password', () => {
		const player = new Player();
		const initialPassword = 'P4ssw0rd..';
		player.validClearPassword = initialPassword;
		expect(player.hashedPassword).to.have.length.greaterThan(0);
		expect(player.hashedPassword).not.to.equal(initialPassword);
	});

	it('can validate a clear password', () => {
		const player = new Player();
		const initialPassword = 'T0p.s3cr3t..';
		player.validClearPassword = initialPassword;
		expect(player.isClearPasswordEqual(initialPassword)).to.be.true;
		expect(player.isClearPasswordEqual('another password')).to.be.false;
	});
});
