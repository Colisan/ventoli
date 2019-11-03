/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import LoginForm from '@/components/LoginForm.vue';
import store from '@/store/';

Vue.use(Vuex);

describe('LoginForm.vue', () => {
  const wrapper = shallowMount(LoginForm, { store });

  it('can be mounted', () => {
    expect(wrapper.html()).not.to.equal(undefined);
  });

  it('renders a login input', () => {
    const inputWrapper = wrapper.find(`#${wrapper.vm.$data.ID_LOGIN}`);
    expect(inputWrapper.exists()).to.be.true;
  });

  it('renders a password input', () => {
    const inputWrapper = wrapper.find(`#${wrapper.vm.$data.ID_PASSWORD}`);
    expect(inputWrapper.exists()).to.be.true;
  });

  it('synchronizes its login input with the store login', () => {
    let newValue = 'tintin le lapin';
    store.commit('setLogin', newValue);
    const inputWrapper = wrapper.find(`#${wrapper.vm.$data.ID_LOGIN}`);
    const inputElement = inputWrapper.element as HTMLInputElement;
    expect(inputElement.value).to.equal(newValue);

    newValue = 'tata le petit chat';
    inputWrapper.setValue(newValue);
    expect(wrapper.vm.$store.state.store.login).to.equal(newValue);
  });

  it('synchronizes its password input with the store password', () => {
    let newValue = 'secret';
    store.commit('setPassword', newValue);
    const inputWrapper = wrapper.find(`#${wrapper.vm.$data.ID_PASSWORD}`);
    const inputElement = inputWrapper.element as HTMLInputElement;
    expect(inputElement.value).to.equal(newValue);

    newValue = 'méga secret';
    inputWrapper.setValue(newValue);
    expect(wrapper.vm.$store.state.store.password).to.equal(newValue);
  });
});
