import { ActionContext, ActionTree } from 'vuex';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Mutations, MutationType } from './mutations';
import { initialState, State } from './state';
import { Player } from '../../../../ventoli-model/dist';
import { avaliableRoutes, RouteType } from '../../../../ventoli-api/src/route/routes';
import { Popup } from '@/model/Popup';

export enum ActionType {
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

export type credentials = {
	login: string;
	password: string;
};

export type accountInfos = {
	oldPassword: string;
	newPassword: string;
};

export type infoPopupSettings = {
	title?: string;
	content: string;
	okLabel?: string;
};

export type Actions = {
	[ActionType.CallLogin](context: TypedActionContext, credentials: credentials): void;
	[ActionType.CallGetSelfAccount](context: TypedActionContext): void;
	[ActionType.CallCreateAccount](context: TypedActionContext, credentials: credentials): void;
	[ActionType.CallEditSelfAccount](context: TypedActionContext, informations: accountInfos): void;
	[ActionType.Logout](context: TypedActionContext): void;
	[ActionType.ShowInfoPopup](context: TypedActionContext, infos: infoPopupSettings): void;
};

async function callApi(
	context: TypedActionContext,
	route: RouteType,
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
			Authorization: `Bearer ${context.state.authToken}`,
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
	async [ActionType.CallLogin](context, credentials) {
		return callApi(
			context,
			RouteType.PostLogin,
			{},
			{
				playername: credentials.login,
				password: credentials.password,
			}
		).then((res: AxiosResponse<any>) => {
			context.commit(MutationType.SetAuthToken, res.data);
			context.dispatch(ActionType.CallGetSelfAccount);
		});
	},
	async [ActionType.CallGetSelfAccount](context) {
		return callApi(context, RouteType.GetSelfPlayer).then((res: AxiosResponse<Player>) => {
			context.commit(MutationType.SetCurrentPlayer, res.data as Player);
		});
	},
	async [ActionType.CallCreateAccount](context, credentials) {
		return callApi(context, RouteType.PostNewPlayer, {
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
			return callApi(context, RouteType.PutSelfPlayer, {
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
