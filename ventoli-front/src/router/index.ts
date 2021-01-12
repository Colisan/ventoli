import VueRouter, { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Welcome from '@/views/home/Welcome.vue';
import Login from '@/views/home/Login.vue';
import CreateAccount from '@/views/home/CreateAccount.vue';
import Game from '@/views/Game.vue';
import Settings from '@/views/game/Settings.vue';
import Start from '@/views/game/Start.vue';
import Play from '@/views/game/Play.vue';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{ path: '', name: 'Welcome', component: Welcome },
			{ path: '/login', name: 'Login', component: Login },
			{ path: '/signin', name: 'Create Account', component: CreateAccount },
		],
	},
	{
		path: '/game',
		name: 'Game',
		component: Game,
		children: [
			{ path: '', name: 'Start', component: Start },
			{ path: '/settings', name: 'Settings', component: Settings },
			{ path: '/play', name: 'PlayGame', component: Play },
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
