import { Popup } from '@/model/Popup';
import { Game, Player } from '../../../../ventoli-model/dist';

export type State = {
	authToken?: string;
	currentPlayer?: Player;
	currentGame?: Game;
	popupList: { [key: number]: Popup };
	lastPopupIndex: number;
};

export const getInitialState = (): State => {
	return {
		authToken: undefined,
		currentPlayer: undefined,
		currentGame: undefined,
		popupList: {},
		lastPopupIndex: 0,
	};
};
