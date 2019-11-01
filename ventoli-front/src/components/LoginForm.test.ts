import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm.vue', () => {
  const wrapper = shallowMount(LoginForm, {});

  it('can be mounted', () => {
    expect(wrapper.html()).not.to.equal(undefined);
  });

  it('renders two input', () => {
    const matches = wrapper.html().match(/<input/g) || [];
    expect(matches).to.have.lengthOf(2);
  });

  it('renders a password input', () => {
    const matches = wrapper.html().match(/<input[^>]*type=['"]password/g) || [];
    expect(matches).to.have.lengthOf(1);
  });
});
