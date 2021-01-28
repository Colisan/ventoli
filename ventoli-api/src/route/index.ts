import { RequestHandler, Router } from 'express';
import { validateJwt } from '../middleware/validateJwt';
import { avaliableRoutes, RouteName } from './routes';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';
import ServerController from '../controller/ServerController';

const router = Router();

function plugRoute(route: RouteName, controller: RequestHandler) {
	let routeInfos = avaliableRoutes[route];
	if (routeInfos.needAuth) router[routeInfos.method](routeInfos.url, [validateJwt], controller);
	else router[routeInfos.method](routeInfos.url, controller);
}

/**
 * @swagger
 *
 * /api/auth/:
 *   get:
 *     $ref: '#/definitions/AuthController_validateAuth'
 */
plugRoute('VALID_AUTH', AuthController.validateAuth);

/**
 * @swagger
 *
 * /api/auth/login/:
 *   post:
 *     $ref: '#/definitions/AuthController_login'
 */
plugRoute('POST_LOGIN', AuthController.login);

/**
 * @swagger
 *
 * /api/player/:
 *   put:
 *     $ref: '#/definitions/PlayerController_editPlayer'
 */
plugRoute('PUT_SELF_PLAYER', PlayerController.editPlayer);

/**
 * @swagger
 *
 * /api/player/:
 *   get:
 *     $ref: '#/definitions/PlayerController_findSelfByName'
 */
plugRoute('GET_SELF_PLAYER', PlayerController.findSelf);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
plugRoute('POST_LOGIN', PlayerController.newPlayer);

/**
 * @swagger
 *
 * /api/player/{playername}:
 *   get:
 *     $ref: '#/definitions/PlayerController_findOneByName'
 */
plugRoute('GET_OTHER_PLAYER', PlayerController.findOneByName);

/**
 * @swagger
 *
 * /api/player/{playername}:
 *   get:
 *     $ref: '#/definitions/ServerController_registerServer'
 */
plugRoute('POST_GAMESERVER', ServerController.registerServer);

export default router;
