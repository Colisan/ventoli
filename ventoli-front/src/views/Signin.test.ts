/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import Signin from '@/views/Signin.vue';
import { routes } from '@/router';
import { testWrapperForRouterPath } from '@/helpers/helperTests';

describe('Signin view', () => {
	const wrapper = shallowMount(Signin, {});

	it('renders something', () => {
		expect(wrapper.html()).not.to.be.undefined;
	});
});
