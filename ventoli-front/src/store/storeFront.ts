import { ActionTree, MutationTree, GetterTree } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import helperStores from '@/helpers/helperStores';

export const getInitialState = () => ({
  login: '',
  password: '',
  authToken: '',
});
const initialState = getInitialState();

export const actions = {
  async loginWithCredentials(store: any): Promise<AxiosResponse<any>> {
    const res = await axios.post(`${process.env.VUE_APP_VENTOLI_API_URL}/auth/login`, {
      playername: store.state.login,
      password: store.state.password,
    });
    store.commit('setAuthToken', res.data);
    return res;
  },
};

export const mutations = {
  ...helperStores.defaultMutations(initialState),
};

export const getters = {};

export default {
  state: initialState,
  namespaced: false,
  actions,
  mutations,
  getters,
};
