import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signin from '@/views/Signin.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

export const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/signin',
		name: 'Signin',
		component: Signin,
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
