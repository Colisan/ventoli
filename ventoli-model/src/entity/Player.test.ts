/* eslint-disable no-unused-expressions */
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Player from "./Player";

chai.use(sinonChai);

describe("Player entity", () => {
  it("is instanciable", () => {
    const player = new Player();
    expect(player).not.to.be.undefined;
    expect(player).not.to.be.null;
  });

  it("can hash its password", () => {
    const player = new Player();
    const initialPassword = "p4ssw0rd";
    player.password = initialPassword;
    player.hashPassword();
    expect(player.password).to.have.length.greaterThan(0);
    expect(player.password).not.to.equal(initialPassword);
  });

  it("can validate a clear password", () => {
    const player = new Player();
    const initialPassword = "t0p.s3cr3t";
    player.password = initialPassword;
    player.hashPassword();
    expect(player.isClearPasswordValid(initialPassword)).to.be.true;
    expect(player.isClearPasswordValid("another password")).to.be.false;
  });
});
