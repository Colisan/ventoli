import { ActionTree, MutationTree, GetterTree } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import helperStores from '@/helpers/helperStores';

export const getInitialState = () => ({
	authToken: '',
});
const initialState = getInitialState();

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
					throw new Error('Wrong username or password.');
				}
				throw err.toString();
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
					if (err.status === 400) {
						throw new Error("Credentials don't respect constraints.");
					}
					if (err.status === 409) {
						throw new Error('Username not avaliable.');
					}
				}
				throw new Error(err.toString());
			});
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
