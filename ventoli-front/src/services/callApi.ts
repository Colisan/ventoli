import axios, { AxiosRequestConfig } from 'axios';
import { avaliableRoutes, RouteType } from '@ventoli/ventoli-api/src/route/routes';

export default async function (
	route: RouteType,
	token?: string,
	getParams: Record<string, { toString: Function }> = {},
	postParams: Object = {}
): Promise<any> {
	const routeInfos = avaliableRoutes[route];

	let url = `${process.env.VUE_APP_VENTOLI_API_URL}${routeInfos.url}`;
	for (let name in getParams) {
		url.replace(`:${name}`, getParams[name].toString());
	}

	const handleApiError = (err: any) => {
		if (err.response) {
			throw new Error(err.response.data);
		}
		throw new Error(err.toString());
	};

	let config: AxiosRequestConfig = {};
	if (routeInfos.needAuth) {
		config.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	if (process.env.NODE_ENV === 'development') console.log('calling API', url, postParams, config);

	if (routeInfos.method === 'get') {
		return axios.get(url, config).catch(handleApiError);
	} else if (routeInfos.method === 'post') {
		return axios.post(url, postParams, config).catch(handleApiError);
	} else if (routeInfos.method === 'put') {
		return axios.put(url, postParams, config).catch(handleApiError);
	}
}
