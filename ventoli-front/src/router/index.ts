import VueRouter, { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';
import Login from '@/views/Login.vue';
import SignIn from '@/views/SignIn.vue';
import Settings from '@/views/Settings.vue';
import Start from '@/views/Start.vue';
import Play from '@/views/Play.vue';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{ path: '', name: 'Welcome', component: Welcome },
			{ path: '/login', name: 'LogIn', component: Login },
			{ path: '/signin', name: 'SignIn', component: SignIn },
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
