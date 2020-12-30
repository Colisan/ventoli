import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	createLogger,
} from 'vuex';
import { State, getInitialState } from './state';
import { Mutations, mutations } from './mutations';
import { Actions, actions } from './actions';
import { Getters, getters } from './getters';

// todo : passer en module
const store = createStore<State>({
	plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
	state: getInitialState(),
	mutations,
	actions,
	getters,
});

export default store;

export function useStore() {
	return store as Store;
}

export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1],
		options?: CommitOptions
	): ReturnType<Mutations[K]>;
} & {
	dispatch<K extends keyof Actions>(
		key: K,
		payload?: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>;
} & {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>;
	};
};
