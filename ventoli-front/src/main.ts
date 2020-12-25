import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import getStore from './store';

createApp(App).use(getStore(localStorage)).use(router).mount('#app');
