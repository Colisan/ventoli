import { Router } from 'express';

export type RouteInfos = {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'>;
	url: string;
	needAuth: boolean;
};

function getAvaliableRoutes<T extends Record<string, RouteInfos>>(routelist: T) {
	return routelist;
}

export const avaliableRoutes = getAvaliableRoutes({
	VALID_AUTH: { method: 'get', url: '/auth', needAuth: true },
	POST_LOGIN: { method: 'post', url: '/auth/login', needAuth: false },
	PUT_SELF_PLAYER: { method: 'put', url: '/player', needAuth: true },
	GET_SELF_PLAYER: { method: 'get', url: '/player', needAuth: true },
	POST_NEW_PLAYER: { method: 'post', url: '/player', needAuth: false },
	GET_OTHER_PLAYER: { method: 'get', url: '/player/:playername', needAuth: false },
	POST_GAMESERVER: { method: 'post', url: '/server', needAuth: false },
});

export type RouteName = keyof typeof avaliableRoutes;

export type RouteList = Record<RouteName, RouteInfos>;
