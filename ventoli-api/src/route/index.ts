import { RequestHandler, Router } from 'express';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';
import { validateJwt } from '../middleware/validateJwt';
import { avaliableRoutes, RouteType } from './routes';

const router = Router();

function plugRoute(route: RouteType, controller: RequestHandler) {
	let routeInfos = avaliableRoutes[route];
	if (routeInfos.needAuth) router[routeInfos.method](routeInfos.url, [validateJwt], controller);
	else router[routeInfos.method](routeInfos.url, controller);
}

/**
 * @swagger
 *
 * /api/auth/login/:
 *   post:
 *     $ref: '#/definitions/AuthController_login'
 */
plugRoute(RouteType.PostLogin, AuthController.login);

/**
 * @swagger
 *
 * /api/player/:
 *   put:
 *     $ref: '#/definitions/PlayerController_editPlayer'
 */
plugRoute(RouteType.PutSelfPlayer, PlayerController.editPlayer);

/**
 * @swagger
 *
 * /api/player/:
 *   get:
 *     $ref: '#/definitions/PlayerController_findSelfByName'
 */
plugRoute(RouteType.GetSelfPlayer, PlayerController.findSelf);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
plugRoute(RouteType.PostLogin, PlayerController.newPlayer);

/**
 * @swagger
 *
 * /api/player/{playername}:
 *   get:
 *     $ref: '#/definitions/PlayerController_findOneByName'
 */
plugRoute(RouteType.GetOtherPlayer, PlayerController.findOneByName);

export default router;
