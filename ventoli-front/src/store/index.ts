import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';
import storeFront, { GetStoreFrontPlugin } from '@/store/storeFront';

Vue.use(Vuex);

const getStore = (storage: Storage): Store<any> =>
	new Vuex.Store<any>({
		modules: {
			storeFront,
		},
		plugins: [GetStoreFrontPlugin(storage)],
	});

export default getStore;
