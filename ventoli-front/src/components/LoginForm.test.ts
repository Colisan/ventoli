/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import LoginForm from '@/components/LoginForm.vue';
import store from '@/store/';

chai.use(sinonChai);
Vue.use(Vuex);

describe('LoginForm component', () => {
	const wrapper = shallowMount(LoginForm, { store });

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});

	it('renders a text input', () => {
		const inputWrapper = wrapper.find('input:not([type])');
		expect(inputWrapper.exists()).to.be.true;
	});

	it('renders a password input', () => {
		const inputWrapper = wrapper.find('input[type=password]');
		expect(inputWrapper.exists()).to.be.true;
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
		sinon.restore();
	});
});
