/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { actions } from './storeFront';

chai.use(sinonChai);

describe('loginWithCredentials action', () => {
  it('exists', () => {
    expect(actions.loginWithCredentials).not.to.be.undefined;
  });

  it('calls axios with login and password and set authToken with the result', async () => {
    const postStub = sinon.stub(axios, 'post');
    const postData = 'fetchedToken';
    postStub.returns(
      new Promise((resolve, _) => {
        resolve({ data: postData });
      })
    );
    const store = {
      state: {
        login: 'LuXxor te RoxXor',
        password: 'p4ssw0rd',
      },
      commit: sinon.stub(),
    };
    await actions.loginWithCredentials(store);
    expect(postStub).to.have.been.calledOnceWith(sinon.match.any, {
      playername: store.state.login,
      password: store.state.password,
    });
    expect(store.commit).to.have.been.calledOnceWith('setAuthToken', postData);
    sinon.restore();
  });
});
