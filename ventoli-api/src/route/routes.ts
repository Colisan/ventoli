import { Router } from 'express';

export enum RouteType {
	PostLogin = 'POST_LOGIN',
	PutSelfPlayer = 'PUT_SELF_PLAYER',
	GetSelfPlayer = 'GET_SELF_PLAYER',
	PostNewPlayer = 'POST_NEW_PLAYER',
	GetOtherPlayer = 'GET_OTHER_PLAYER',
}

export type routeInfos = {
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'>;
	url: string;
	needAuth: boolean;
};

export type routeList = {
	[key in RouteType]: routeInfos;
};

export const avaliableRoutes: routeList = {
	[RouteType.PostLogin]: { method: 'post', url: '/auth/login', needAuth: false },
	[RouteType.PutSelfPlayer]: { method: 'put', url: '/auth/login', needAuth: true },
	[RouteType.GetSelfPlayer]: { method: 'get', url: '/auth/login', needAuth: true },
	[RouteType.PostNewPlayer]: { method: 'post', url: '/auth/login', needAuth: false },
	[RouteType.GetOtherPlayer]: { method: 'get', url: '/player/:playername', needAuth: false },
};
