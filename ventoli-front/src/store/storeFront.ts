import helperStores from '@/helpers/helperStores';

const getInitialState = () => ({
  login: '',
  password: '',
});
const initialState = getInitialState();

const actions = {
};

const mutations = {
  ...helperStores.defaultMutations(initialState),
};

const getters = {
  ...helperStores.defaultGetters(initialState),
};

export default {
  state: initialState,
  namespaced: false,
  actions,
  mutations,
  getters,
};
