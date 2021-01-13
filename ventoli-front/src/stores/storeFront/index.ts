import { createStore, Store as VuexStore, DispatchOptions, createLogger } from 'vuex';
import { State, getInitialState } from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

// todo : passer en module
const store = createStore<State>({
	plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
	state: getInitialState(),
	mutations,
	actions,
	getters,
});

export default store;

export type typedCommit = <K extends keyof typeof mutations>(
	key: K,
	payload: Parameters<typeof mutations[K]>[1]
) => ReturnType<typeof mutations[K]>;
export type typedDispatch = <K extends keyof typeof actions>(
	key: K,
	payload?: Parameters<typeof actions[K]>[1],
	options?: DispatchOptions
) => ReturnType<typeof actions[K]>;
export type typedGetters = { [K in keyof typeof getters]: ReturnType<typeof getters[K]> };
export type typedStore = {
	commit: typedCommit;
	dispatch: typedDispatch;
	getters: typedGetters;
};

export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & typedStore;

export function useStore() {
	return store as Store;
}
