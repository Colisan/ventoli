import { ActionTree, MutationTree, GetterTree } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import helperStores from '@/helpers/helperStores';

export const getInitialState = () => ({
  authToken: '',
});
const initialState = getInitialState();

export const actions = {
  async loginWithCredentials(store: any, credentials: any): Promise<AxiosResponse<any>> {
    const res = await axios.post(`${process.env.VUE_APP_VENTOLI_API_URL}/auth/login`, {
      playername: credentials.login,
      password: credentials.password,
    });
    store.commit('setAuthToken', res.data);
    return res;
  },
  async createAccount(store: any, informations: any): Promise<AxiosResponse<any>> {
    const res = await axios.post(`${process.env.VUE_APP_VENTOLI_API_URL}/player`, {
      playername: informations.login,
      password: informations.password,
    });
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
