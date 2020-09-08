/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SettingsForm from '@/components/SettingsForm.vue';
import getStore from '@/store/';

chai.use(sinonChai);
Vue.use(Vuex);

describe('SettingsForm component', () => {
	const localStorageStub = ({
		getItem: sinon.stub(),
		setItem: sinon.stub(),
	} as unknown) as Storage;
	const wrapper = shallowMount(SettingsForm, {
		store: getStore(localStorageStub),
	});

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});

	it('renders a submit button', () => {
		const inputWrapper = wrapper.find('input[type=submit]');
		expect(inputWrapper.exists()).to.be.true;
	});
});
