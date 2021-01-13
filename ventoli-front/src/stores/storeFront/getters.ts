import { GetterTree } from 'vuex';
import { State } from './state';

export default {
	isLoggedIn(state: State): boolean {
		return Boolean(state.authToken);
	},
};
