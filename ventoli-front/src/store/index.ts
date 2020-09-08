import Vue from 'vue';
import Vuex from 'vuex';
import storeFront, { GetStoreFrontPlugin } from '@/store/storeFront';

Vue.use(Vuex);

export default (storage: Storage) =>
	new Vuex.Store({
		modules: {
			storeFront,
		},
		plugins: [GetStoreFrontPlugin(storage)],
	});
