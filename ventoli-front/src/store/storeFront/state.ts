import { Popup } from '@/model/Popup';
import { Game, Player } from '../../../../ventoli-model/dist';

export type State = {
	authToken: string | undefined;
	currentPlayer: Player | undefined;
	currentGame: Game | undefined;
	popupList: { [key: number]: Popup };
	lastPopupIndex: number;
};

export const initialState: State = {
	authToken: undefined,
	currentPlayer: undefined,
	currentGame: undefined,
	popupList: {},
	lastPopupIndex: 0,
};
