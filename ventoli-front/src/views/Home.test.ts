/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import { routes } from '@/router';
import { testWrapperForRouterPath } from '@/helpers/helperTests';

describe('Home view', () => {
  const wrapper = shallowMount(Home, {});

  it('renders something', () => {
    expect(wrapper.html()).not.to.be.undefined;
  });

  it('is polite', () => {
    expect(wrapper.html()).to.include('Hello');
  });

  it('renders a link to the login view', () => {
    testWrapperForRouterPath(wrapper, 'Login');
  });
});
