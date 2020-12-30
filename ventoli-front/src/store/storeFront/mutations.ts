import { Popup } from '@/model/Popup';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationType {
	SetAuthToken = 'SET_AUTH_TOKEN',
	SetCurrentPlayer = 'SET_CURRENT_PLAYER',
	SetCurrentGame = 'SET_CURRENT_GAME',
	AddPopup = 'ADD_POPUP',
	RemovePopup = 'REMOVE_POPUP',
}

export type Mutations = {
	[MutationType.SetAuthToken](state: State, newAuthToken: State['authToken']): void;
	[MutationType.SetCurrentPlayer](state: State, newPlayer: State['currentPlayer']): void;
	[MutationType.SetCurrentGame](state: State, newGame: State['currentGame']): void;
	[MutationType.AddPopup](state: State, popup: Popup): number;
	[MutationType.RemovePopup](state: State, index: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
	[MutationType.SetAuthToken](state, newAuthToken) {
		state.authToken = newAuthToken;
	},
	[MutationType.SetCurrentPlayer](state, newPlayer) {
		state.currentPlayer = newPlayer;
	},
	[MutationType.SetCurrentGame](state, newGame) {
		state.currentGame = newGame;
	},
	[MutationType.AddPopup](state, popup) {
		const newIndex = ++state.lastPopupIndex;
		state.popupList[newIndex] = popup;
		return newIndex;
	},
	[MutationType.RemovePopup](state, index) {
		if (state.popupList[index]) delete state.popupList[index];
	},
};
