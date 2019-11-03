import { ActionTree, MutationTree, GetterTree } from 'vuex';
import helperStores from '@/helpers/helperStores';

const getInitialState = () => ({
  login: '',
  password: '',
  isConnected: false,
});
const initialState = getInitialState();

const actions: ActionTree<any, any> = {
  loginWithCredentials(store: any) {
  },
};

const mutations: MutationTree<any> = {
  ...helperStores.defaultMutations(initialState),
};

const getters: GetterTree<any, any> = {
};

export default {
  state: initialState,
  namespaced: false,
  actions,
  mutations,
  getters,
};
