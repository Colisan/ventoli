/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import LoginForm from '@/components/LoginForm.vue';
import getStore from '@/store/';

chai.use(sinonChai);
Vue.use(Vuex);

describe('LoginForm component', () => {
	const localStorageStub = ({
		getItem: sinon.stub(),
		setItem: sinon.stub(),
	} as unknown) as Storage;
	const wrapper = shallowMount(LoginForm, {
		store: getStore(localStorageStub),
	});

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});

	it('renders a submit button', () => {
		const inputWrapper = wrapper.find('input[type=submit]');
		expect(inputWrapper.exists()).to.be.true;
	});

	it("calls store's loginWithCredentials action when form submitted", () => {
		const inputWrapper = wrapper.find('form');
		const actionStub = sinon.stub(wrapper.vm.$store, 'dispatch');
		actionStub.resolves('ok');
		inputWrapper.trigger('submit');
		expect(actionStub).to.have.been.calledWith('loginWithCredentials');
		actionStub.restore();
	});
});
