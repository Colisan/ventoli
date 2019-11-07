import { ActionTree, MutationTree, GetterTree } from 'vuex';
import axios from 'axios';
import helperStores from '@/helpers/helperStores';

const getInitialState = () => ({
  login: '',
  password: '',
  isConnected: false,
});
const initialState = getInitialState();

const actions: ActionTree<any, any> = {
  loginWithCredentials(store: any) {
    axios
      .post(`${process.env.VUE_APP_VENTOLI_API_URL}/auth/login`, {
        playername: store.state.login,
        password: store.state.password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
};

const mutations: MutationTree<any> = {
  ...helperStores.defaultMutations(initialState),
};

const getters: GetterTree<any, any> = {};

export default {
  state: initialState,
  namespaced: false,
  actions,
  mutations,
  getters,
};
