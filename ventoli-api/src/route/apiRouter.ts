import { Router } from 'express';
import AuthController from '../controller/AuthController';
import PlayerController from '../controller/PlayerController';

export default class ApiRouter {
  router: Router;
  authController: AuthController;
  playerController: PlayerController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.playerController = new PlayerController();
  }

  setupRoutes() {
    /**
     * @swagger
     *
     * /api/auth/login:
     *   post:
     *     $ref: '#/definitions/AuthController_login'
     */
    this.router.post('/auth/login', this.authController.login);

    /**
     * @swagger
     *
     * /api/player/{playername}:
     *   get:
     *     $ref: '#/definitions/PlayerController_findOneByName'
     */
    this.router.get('/player/:playername', this.playerController.findOneByName);

    /**
     * @swagger
     *
     * /api/player/:
     *   post:
     *     $ref: '#/definitions/PlayerController_newPlayer'
     */
    this.router.post('/player/', this.playerController.newPlayer);
  }
}
