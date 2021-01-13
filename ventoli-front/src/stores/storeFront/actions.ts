import { ActionContext, ActionTree } from 'vuex';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getInitialState, State } from '@/stores/storeFront/state';
import { Player } from '@ventoli/ventoli-model';
import { avaliableRoutes, RouteType } from '@ventoli/ventoli-api/src/route/routes';
import { Popup } from '@/model/Popup';
import { typedStore } from '@/stores/storeFront';
import callApi from '@/services/callApi';

type TypedActionContext = Omit<ActionContext<State, State>, 'getters' | 'commit' | 'dispatch'> &
	typedStore;

export default {
	async TestThenCallSetToken(context: TypedActionContext, token: string): Promise<any> {
		return callApi(RouteType.ValidAuth, token).then((res: AxiosResponse<any>) => {
			context.commit('SetAuthToken', token);
		});
	},
	async CallLogin(
		context: TypedActionContext,
		credentials: { login: string; password: string; willRemember: boolean }
	): Promise<any> {
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
			context.commit('SetAuthToken', res.data);
			context.dispatch('CallGetSelfAccount');
		});
	},
	async CallGetSelfAccount(context: TypedActionContext): Promise<any> {
		return callApi(RouteType.GetSelfPlayer, context.state.authToken).then(
			(res: AxiosResponse<Player>) => {
				context.commit('SetCurrentPlayer', res.data);
			}
		);
	},
	async CallCreateAccount(
		context: TypedActionContext,
		credentials: { login: string; password: string }
	): Promise<any> {
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
	async CallEditSelfAccount(
		context: TypedActionContext,
		informations: { oldPassword: string; newPassword: string }
	): Promise<any> {
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
	Logout(context: TypedActionContext): void {
		let initialState = getInitialState();
		context.commit('SetAuthToken', initialState.authToken);
		context.commit('SetCurrentGame', initialState.currentGame);
		context.commit('SetCurrentPlayer', initialState.currentPlayer);
	},
	ShowInfoPopup(
		context: TypedActionContext,
		infos: { title?: string; content: string; okLabel?: string }
	): void {
		const popup = new Popup(infos.content);
		popup.title = infos.title;

		let popupIndex: number;
		popup.buttonList = [
			{
				label: infos.okLabel ?? 'Ok',
				action: () => {
					context.commit('RemovePopup', popupIndex);
				},
			},
		];
		context.commit('AddPopup', popup);
		popupIndex = context.state.lastPopupIndex.valueOf();
	},
};
