import { ActionTree, MutationTree, GetterTree, Store } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import helperStores from '@/helpers/helperStores';

let initialAuthToken: string;

export const initialState = {
	authToken: initialAuthToken = '',
};

export const GetStoreFrontPlugin = (storage: Storage) => (
	store: Store<typeof initialState>
) => {
	store.commit('setAuthToken', storage.getItem('auth-token'));
	store.subscribe((mutation, state) => {
		if (mutation.type === 'setAuthToken') {
			console.log(mutation);
			if (mutation.payload) {
				storage.setItem('auth-token', mutation.payload);
			} else {
				storage.removeItem('auth-token');
			}
		}
	});
};

export const actions = {
	async loginWithCredentials(store: any, credentials: any): Promise<any> {
		return axios
			.post(`${process.env.VUE_APP_VENTOLI_API_URL}/auth/login`, {
				playername: credentials.login,
				password: credentials.password,
			})
			.then((res: AxiosResponse<any>) => {
				store.commit('setAuthToken', res.data);
				return res.data;
			})
			.catch((err: any) => {
				if (err.response) {
					throw new Error(err.response.data);
				}
				throw new Error(err.toString());
			});
	},
	async createAccount(store: any, informations: any): Promise<any> {
		return axios
			.post(`${process.env.VUE_APP_VENTOLI_API_URL}/player`, {
				playername: informations.login,
				password: informations.password,
			})
			.then((res: AxiosResponse<any>) => {
				return res.data;
			})
			.catch((err: any) => {
				if (err.response) {
					throw new Error(err.response.data);
				}
				throw new Error(err.toString());
			});
	},
	logout(store: any) {
		store.commit('setAuthToken', initialAuthToken);
	},
};

export const mutations = {
	...helperStores.defaultMutations(initialState),
};

export const getters = {
	...helperStores.defaultGetters(initialState),
	isLoggedIn: (store: any) => Boolean(store.authToken),
};

export default {
	state: initialState,
	namespaced: false,
	actions,
	mutations,
	getters,
};
