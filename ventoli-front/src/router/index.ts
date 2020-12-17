import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signin from '@/views/Signin.vue';
import Settings from '@/views/Settings.vue';
import PlayGame from '@/views/PlayGame.vue';

Vue.use(VueRouter);

export const noLoginComponentList = [];

export const routes = [
	{
		path: '/',
		name: 'Welcome',
		component: Welcome,
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
		path: '/home',
		name: 'Home',
		component: Home,
	},
	{
		path: '/settings',
		name: 'Settings',
		component: Settings,
	},
	{
		path: '/game',
		name: 'PlayGame',
		component: PlayGame,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
