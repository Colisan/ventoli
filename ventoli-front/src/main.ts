import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);

console.log(process.env);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
