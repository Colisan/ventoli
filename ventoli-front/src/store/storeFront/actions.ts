import { ActionContext, ActionTree } from 'vuex';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Mutations, MutationType } from './mutations';
import { getInitialState, State } from './state';
import { Player } from '@ventoli/ventoli-model';
import { avaliableRoutes, RouteType } from '@ventoli/ventoli-api/src/route/routes';
import { Popup } from '@/model/Popup';

export enum ActionType {
	TestThenSetToken = 'TEST_THEN_SET_TOKEN',
	CallLogin = 'CALL_LOGIN',
	CallGetSelfAccount = 'CALL_GET_SELF_ACCOUNT',
	CallCreateAccount = 'CALL_CREATE_SELF_ACCOUNT',
	CallEditSelfAccount = 'CALL_EDIT_SELF_ACCOUNT',
	Logout = 'LOGOUT',
	ShowInfoPopup = 'SHOW_INFO_POPUP',
}

type TypedActionContext = Omit<ActionContext<State, State>, 'commit'> & {
	// custom commit declaration to validate payload types
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
};

export type Actions = {
	[ActionType.TestThenSetToken](context: TypedActionContext, token: string): void;
	[ActionType.CallLogin](
		context: TypedActionContext,
		credentials: {
			login: string;
			password: string;
			willRemember: boolean;
		}
	): void;
	[ActionType.CallGetSelfAccount](context: TypedActionContext): void;
	[ActionType.CallCreateAccount](
		context: TypedActionContext,
		credentials: {
			login: string;
			password: string;
		}
	): void;
	[ActionType.CallEditSelfAccount](
		context: TypedActionContext,
		informations: {
			oldPassword: string;
			newPassword: string;
		}
	): void;
	[ActionType.Logout](context: TypedActionContext): void;
	[ActionType.ShowInfoPopup](
		context: TypedActionContext,
		infos: {
			title?: string;
			content: string;
			okLabel?: string;
		}
	): void;
};

async function callApi(
	route: RouteType,
	token?: string,
	getParams: { [key: string]: { toString: Function } } = {},
	postParams: Object = {}
): Promise<any> {
	const routeInfos = avaliableRoutes[route];

	let url = `${process.env.VUE_APP_VENTOLI_API_URL}${routeInfos.url}`;
	for (let name in getParams) {
		url.replace(`:${name}`, getParams[name].toString());
	}

	const handleApiError = (err: any) => {
		if (err.response) {
			throw new Error(err.response.data);
		}
		throw new Error(err.toString());
	};

	let config: AxiosRequestConfig = {};
	if (routeInfos.needAuth) {
		config.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	if (process.env.NODE_ENV === 'development') console.log('calling API', url, postParams, config);

	if (routeInfos.method === 'get') {
		return axios.get(url, config).catch(handleApiError);
	} else if (routeInfos.method === 'post') {
		return axios.post(url, postParams, config).catch(handleApiError);
	} else if (routeInfos.method === 'put') {
		return axios.put(url, postParams, config).catch(handleApiError);
	}
}

export const actions: ActionTree<State, State> & Actions = {
	async [ActionType.TestThenSetToken](context, token) {
		return callApi(RouteType.ValidAuth, token).then((res: AxiosResponse<any>) => {
			context.commit(MutationType.SetAuthToken, token);
		});
	},
	async [ActionType.CallLogin](context, credentials) {
		return callApi(
			RouteType.PostLogin,
			context.state.authToken,
			{},
			{
				playername: credentials.login,
				password: credentials.password,
				willRemember: credentials.willRemember,
			}
		).then((res: AxiosResponse<any>) => {
			context.commit(MutationType.SetAuthToken, res.data);
			context.dispatch(ActionType.CallGetSelfAccount);
		});
	},
	async [ActionType.CallGetSelfAccount](context) {
		return callApi(RouteType.GetSelfPlayer, context.state.authToken).then(
			(res: AxiosResponse<Player>) => {
				context.commit(MutationType.SetCurrentPlayer, res.data);
			}
		);
	},
	async [ActionType.CallCreateAccount](context, credentials) {
		return callApi(RouteType.PostNewPlayer, context.state.authToken, {
			playername: credentials.login,
			password: credentials.password,
		}).catch((err: any) => {
			if (err.response) {
				throw new Error(err.response.data);
			}
			throw new Error(err.toString());
		});
	},
	async [ActionType.CallEditSelfAccount](context, informations) {
		if (context.state.currentPlayer)
			return callApi(RouteType.PutSelfPlayer, context.state.authToken, {
				id: context.state.currentPlayer.id,
				oldPassword: informations.oldPassword,
				newPassword: informations.newPassword,
			})
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
		else return Promise.reject('Not logged in');
	},
	[ActionType.Logout](context) {
		let initialState = getInitialState();
		context.commit(MutationType.SetAuthToken, initialState.authToken);
		context.commit(MutationType.SetCurrentGame, initialState.currentGame);
		context.commit(MutationType.SetCurrentPlayer, initialState.currentPlayer);
	},
	[ActionType.ShowInfoPopup](context, infos) {
		const popup = new Popup(infos.content);
		popup.title = infos.title;

		let popupIndex: number;
		popup.buttonList = [
			{
				label: infos.okLabel ?? 'Ok',
				action: () => {
					context.commit(MutationType.RemovePopup, popupIndex);
				},
			},
		];
		context.commit(MutationType.AddPopup, popup);
		popupIndex = context.state.lastPopupIndex.valueOf();
	},
};
