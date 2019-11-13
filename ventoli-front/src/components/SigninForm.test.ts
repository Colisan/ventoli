/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SigninForm from '@/components/SigninForm.vue';
import store from '@/store/';

chai.use(sinonChai);
Vue.use(Vuex);

describe('SigninForm component', () => {
  const wrapper = shallowMount(SigninForm, { store });

  it('renders something', () => {
    expect(wrapper.html()).not.to.be.undefined;
  });
});
