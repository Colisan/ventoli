import {
	ActionTree,
	MutationTree,
	GetterTree,
	Store,
	Module,
	ActionContext,
	Plugin,
} from 'vuex';
import axios, { AxiosError, AxiosResponse } from 'axios';
import helperStores from '@/helpers/helperStores';
import { Player, Game } from '../../../ventoli-model/dist';

let initialAuthToken: string | undefined;
let initialPlayer: Player | undefined;
let game: Game | undefined;

export const initialState = {
	authToken: initialAuthToken = undefined,
	currentPlayer: initialPlayer = undefined,
	currentGame: game = undefined,
};

export type State = typeof initialState;

export const GetStoreFrontPlugin = (storage: Storage): Plugin<State> => (
	store: Store<State>
) => {
	store.commit('setAuthToken', storage.getItem('auth-token'));
	store.dispatch('fetchAccountInformations');
	store.subscribe((mutation, state) => {
		if (mutation.type === 'setAuthToken') {
			if (mutation.payload) {
				storage.setItem('auth-token', mutation.payload);
			} else {
				storage.removeItem('auth-token');
			}
		}
	});
};

export const actions: ActionTree<State, any> = {
	async loginWithCredentials(
		store: ActionContext<State, any>,
		credentials: any
	): Promise<any> {
		return axios
			.post(`${process.env.VUE_APP_VENTOLI_API_URL}/auth/login`, {
				playername: credentials.login,
				password: credentials.password,
			})
			.then((res: AxiosResponse<any>) => {
				store.commit('setAuthToken', res.data);
				store.dispatch('fetchAccountInformations');
				return res.data;
			})
			.catch((err: any) => {
				if (err.response) {
					throw new Error(err.response.data);
				}
				throw new Error(err.toString());
			});
	},
	async fetchAccountInformations(
		store: ActionContext<State, any>
	): Promise<any> {
		return axios
			.get(`${process.env.VUE_APP_VENTOLI_API_URL}/player`, {
				headers: {
					Authorization: `Bearer ${store.state.authToken}`,
				},
			})
			.then((res: AxiosResponse<Player>) => {
				store.commit('setCurrentPlayer', res.data);
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					if (err.response.status === 401) {
						store.dispatch('logout');
					} else throw new Error(err.response.data);
				} else throw new Error(err.toString());
			});
	},
	async createAccount(
		store: ActionContext<State, any>,
		informations: any
	): Promise<any> {
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
	async editAccount(
		store: ActionContext<State, any>,
		informations: any
	): Promise<any> {
		return axios
			.put(
				`${process.env.VUE_APP_VENTOLI_API_URL}/player`,
				{
					id: ((store.state.currentPlayer as unknown) as Player).id,
					oldPassword: informations.oldPassword,
					newPassword: informations.newPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${store.state.authToken}`,
					},
				}
			)
			.then((res: AxiosResponse<any>) => {
				return res.data;
			})
			.catch((err: any) => {
				console.error(err);
				if (err.response) {
					throw new Error(err.response.data);
				}
				throw new Error(err.toString());
			});
	},
	logout(store: ActionContext<State, any>) {
		store.commit('setAuthToken', initialAuthToken);
		store.commit('setCurrentPlayer', initialPlayer);
	},
};

export const mutations = {
	...helperStores.defaultMutations<State>(initialState),
};

export const getters = {
	...helperStores.defaultGetters<State>(initialState),
	isLoggedIn: (store: State) => Boolean(store.authToken),
};

const storeFront: Module<State, any> = {
	state: initialState,
	namespaced: false,
	actions,
	mutations,
	getters,
};
export default storeFront;
