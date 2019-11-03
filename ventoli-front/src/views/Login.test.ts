/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
  const wrapper = shallowMount(Login, {});

  it('renders something', () => {
    expect(wrapper.html()).not.to.be.undefined;
  });

  it('has a LoginForm component as child', () => {
    expect(wrapper.find(LoginForm).exists()).to.equal(true);
  });
});
