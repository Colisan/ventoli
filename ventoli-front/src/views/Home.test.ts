/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Login.vue', () => {
  const wrapper = shallowMount(Home, {});

  it('renders something', () => {
    expect(wrapper.html()).not.to.be.undefined;
  });

  it('is polite', () => {
    expect(wrapper.html()).to.include('Hello');
  });
});
