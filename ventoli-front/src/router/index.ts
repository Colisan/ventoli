import VueRouter, { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignIn from '@/views/SignIn.vue';
import Settings from '@/views/Settings.vue';
import PlayGame from '@/views/PlayGame.vue';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Welcome',
		component: Welcome,
	},
	{
		path: '/login',
		name: 'LogIn',
		component: Login,
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: SignIn,
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

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
