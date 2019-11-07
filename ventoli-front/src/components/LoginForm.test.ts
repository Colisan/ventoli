/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import LoginForm from '@/components/LoginForm.vue';
import store from '@/store/';

chai.use(sinonChai);
Vue.use(Vuex);

describe('LoginForm component', () => {
  const wrapper = shallowMount(LoginForm, { store });

  it('renders something', () => {
    expect(wrapper.html()).not.to.be.undefined;
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

  it('renders a submit button', () => {
    const inputWrapper = wrapper.find('input[type=submit]');
    expect(inputWrapper.exists()).to.be.true;
  });

  it("calls store's login action when form submitted", () => {
    const inputWrapper = wrapper.find('form');
    const actionSpy = sinon.spy(wrapper.vm.$store, 'dispatch');
    inputWrapper.trigger('submit');
    expect(actionSpy).to.have.been.called;
  });
});
