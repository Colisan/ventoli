/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SigninForm from '@/components/SigninForm.vue';
import Signin from '@/views/Signin.vue';
import getStore from '@/store/';
import { testWrapperForRouterPath } from '@/helpers/helperTests';

chai.use(sinonChai);
Vue.use(Vuex);

describe('Signin view', () => {
	const localStorageStub = ({
		getItem: sinon.stub(),
		setItem: sinon.stub(),
	} as unknown) as Storage;
	const wrapper = shallowMount(Signin, {
		store: getStore(localStorageStub),
	});

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});

	it('has a SigninForm component as child', () => {
		expect(wrapper.find(SigninForm).exists()).to.equal(true);
	});

	it('renders a link to the home view', () => {
		testWrapperForRouterPath(wrapper, 'Home');
	});
});
