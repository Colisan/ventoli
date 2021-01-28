import { Request, Response } from 'express';

export default class PlayerController {
	/**
	 * @swagger
	 *
	 * definitions:
	 *   ServerController_registerServer:
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - in: path
	 *         name: playername
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 */
	public static async registerServer(req: Request, res: Response) {
		console.log('registerServer', req);

		res.status(402).send('Player not found');
	}
}
