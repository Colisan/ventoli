import { Game, Player } from '../../../../ventoli-model/dist';

export type State = {
	authToken: string | undefined;
	currentPlayer: Player | undefined;
	currentGame: Game | undefined;
};

export const initialState: State = {
	authToken: undefined,
	currentPlayer: undefined,
	currentGame: undefined,
};
