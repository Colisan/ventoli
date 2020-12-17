/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Home from '@/views/Home.vue';
import getStore from '@/store/';
import { testWrapperForRouterPath } from '@/helpers/helperTests';

chai.use(sinonChai);
Vue.use(Vuex);

describe('Home view', () => {
	const localStorageStub = ({
		getItem: sinon.stub(),
		setItem: sinon.stub(),
	} as unknown) as Storage;
	const wrapper = shallowMount(Home, {
		store: getStore(localStorageStub),
	});

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});
	/*
	it('renders a link to the login view', () => {
		testWrapperForRouterPath(wrapper, 'Login');
	});

	it('renders a link to the signin view', () => {
		testWrapperForRouterPath(wrapper, 'Signin');
	});
	*/
});
