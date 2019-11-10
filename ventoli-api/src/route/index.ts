import { Router } from 'express';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';

const router = Router();
const playerController = new PlayerController();

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
router.get('/player/:playername', playerController.findOneByName);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
router.post('/player/', playerController.newPlayer);

export default router;
