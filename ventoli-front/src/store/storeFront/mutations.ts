import { MutationTree } from 'vuex';
import { Game, Player } from '../../../../ventoli-model/dist';
import { State } from './state';

export enum MutationType {
	SetAuthToken = 'SET_AUTH_TOKEN',
	SetCurrentPlayer = 'SET_CURRENT_PLAYER',
	SetCurrentGame = 'SET_CURRENT_GAME',
}

export type Mutations = {
	[MutationType.SetAuthToken](state: State, newAuthToken: State['authToken']): void;
	[MutationType.SetCurrentPlayer](state: State, newPlayer: State['currentPlayer']): void;
	[MutationType.SetCurrentGame](state: State, newGame: State['currentGame']): void;
};

export const mutations: MutationTree<State> & Mutations = {
	[MutationType.SetAuthToken](state: State, newAuthToken: State['authToken']) {
		state.authToken = newAuthToken;
	},
	[MutationType.SetCurrentPlayer](state: State, newPlayer: State['currentPlayer']) {
		state.currentPlayer = newPlayer;
	},
	[MutationType.SetCurrentGame](state: State, newGame: State['currentGame']) {
		state.currentGame = newGame;
	},
};
