import Vue from 'vue';
import { Route } from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import getStore from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);

const app = new Vue({
	router,
	store: getStore(localStorage),
	render: h => h(App),
}).$mount('#app');
