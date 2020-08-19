import { Router } from 'express';
import AuthController from './controller/AuthController';
import PlayerController from './controller/PlayerController';

const router = Router();

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     $ref: '#/definitions/AuthController_login'
 */
router.post('/auth/login', AuthController.login);

/**
 * @swagger
 *
 * /api/player/{playername}:
 *   get:
 *     $ref: '#/definitions/PlayerController_findOneByName'
 */
router.get('/player/:playername', PlayerController.findOneByName);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
router.post('/player/', PlayerController.newPlayer);

export default router;