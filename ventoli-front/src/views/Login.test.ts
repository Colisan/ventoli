import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
  const wrapper = shallowMount(Login, {});

  it('can be mounted', () => {
    expect(wrapper.html()).not.to.equal(undefined);
  });

  it('has a LoginForm component as child', () => {
    expect(wrapper.find(LoginForm).exists()).to.equal(true);
  });
});
