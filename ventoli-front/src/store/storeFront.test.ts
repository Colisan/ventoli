/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as StoreFront from '@/store/storeFront';

chai.use(sinonChai);

const StoreFrontPluginStub = sinon.stub(StoreFront, 'GetStoreFrontPlugin');

describe('loginWithCredentials action', () => {
	it('exists', () => {
		expect(StoreFront.actions.loginWithCredentials).not.to.be.undefined;
	});

	it('rejects on http error', async () => {
		const postStub = sinon.stub(axios, 'post');
		const postData = 'errorMsg';
		postStub.returns(
			new Promise((resolve, _) => {
				resolve({ status: 500, data: postData });
			})
		);

		expect(async () => StoreFront.actions.loginWithCredentials({}, {})).to
			.throw;
		postStub.restore();
	});

	it('calls axios with login and password and set authToken with the result', async () => {
		const postStub = sinon.stub(axios, 'post');
		const postData = 'fetchedToken';
		postStub.returns(
			new Promise((resolve, _) => {
				resolve({ status: 200, data: postData });
			})
		);
		const store = {
			commit: sinon.stub(),
		};

		const credentials = {
			login: 'LuXxor te RoxXor',
			password: 'p4ssw0rd',
		};

		await StoreFront.actions.loginWithCredentials(store, credentials);
		expect(postStub).to.have.been.calledOnceWith(sinon.match.any, {
			playername: credentials.login,
			password: credentials.password,
		});
		expect(store.commit).to.have.been.calledOnceWith('setAuthToken', postData);
		postStub.restore();
	});
});

describe('createAccount action', () => {
	it('exists', () => {
		expect(StoreFront.actions.createAccount).not.to.be.undefined;
	});

	it('rejects on http error', async () => {
		const postStub = sinon.stub(axios, 'post');
		const postData = 'errorMsg';
		postStub.returns(
			new Promise((resolve, _) => {
				resolve({ status: 500, data: postData });
			})
		);

		expect(async () => StoreFront.actions.createAccount({}, {})).to.throw;
		postStub.restore();
	});

	it('calls axios with login and password and set authToken with the result', async () => {
		const postStub = sinon.stub(axios, 'post');
		const postData = 'fetchedToken';
		postStub.returns(
			new Promise((resolve, _) => {
				resolve({ status: 201, data: postData });
			})
		);
		const store = {
			commit: sinon.stub(),
		};

		const informations = {
			login: 'LuXxor te RoxXor',
			password: 'p4ssw0rd',
		};

		await StoreFront.actions.createAccount(store, informations);
		expect(postStub).to.have.been.calledOnceWith(sinon.match.any, {
			playername: informations.login,
			password: informations.password,
		});

		sinon.restore();
	});
});

StoreFrontPluginStub.restore();
