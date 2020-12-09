import { Router } from 'express';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';
import { validateJwt } from '../middleware/validateJwt';

const router = Router();

/**
 * @swagger
 *
 * /api/auth/login/:
 *   post:
 *     $ref: '#/definitions/AuthController_login'
 */
router.post('/auth/login', AuthController.login);

/**
 * @swagger
 *
 * /api/player/:
 *   put:
 *     $ref: '#/definitions/PlayerController_editPlayer'
 */
router.put('/player', [validateJwt], PlayerController.editPlayer);

/**
 * @swagger
 *
 * /api/player/:
 *   get:
 *     $ref: '#/definitions/PlayerController_findSelfByName'
 */
router.get('/player', [validateJwt], PlayerController.findSelf);

/**
 * @swagger
 *
 * /api/player/:
 *   post:
 *     $ref: '#/definitions/PlayerController_newPlayer'
 */
router.post('/player', PlayerController.newPlayer);

/**
 * @swagger
 *
 * /api/player/{playername}:
 *   get:
 *     $ref: '#/definitions/PlayerController_findOneByName'
 */
router.get('/player/:playername', PlayerController.findOneByName);

export default router;
