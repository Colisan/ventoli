import { Router } from 'express';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';
import { validateJwt } from '../middleware/validateJwt';

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
 * /api/player/:
 *   get:
 *     $ref: '#/definitions/PlayerController_findOneByName'
 */
router.get('/player/:name(.{4,})', [validateJwt], PlayerController.findOneByName);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
router.post('/player/', PlayerController.newPlayer);

export default router;