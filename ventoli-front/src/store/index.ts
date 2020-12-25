import { createStore, Store, useStore } from 'vuex';
import storeFront, { GetStoreFrontPlugin, State } from '@/store/storeFront';

const getStore = (storage: Storage): Store<State> =>
	createStore({
		modules: {
			storeFront,
		},
		plugins: [GetStoreFrontPlugin(storage)],
		strict: true,
	});

export default getStore;
