import { Popup } from '@/model/Popup';
import { State } from './state';

export default {
	SetAuthToken(state: State, newAuthToken: State['authToken']): void {
		state.authToken = newAuthToken;
	},
	SetCurrentPlayer(state: State, newPlayer: State['currentPlayer']): void {
		state.currentPlayer = newPlayer;
	},
	SetCurrentGame(state: State, newGame: State['currentGame']): void {
		state.currentGame = newGame;
	},
	AddPopup(state: State, popup: Popup): number {
		const newIndex = ++state.lastPopupIndex;
		state.popupList[newIndex] = popup;
		return newIndex;
	},
	RemovePopup(state: State, index: number): void {
		if (state.popupList[index]) delete state.popupList[index];
	},
};
