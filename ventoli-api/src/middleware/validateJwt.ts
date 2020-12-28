import { Request, Response, NextFunction } from 'express';
import JwtPayload from '../model/JwtPayload';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
	let token: string | undefined;

	if (!(token = req.headers.authorization?.split(' ')[1])) {
		res.status(400).send('Require authentification token');
		return;
	}

	if (token) {
		let payload: JwtPayload;

		try {
			payload = JwtPayload.fromSignedToken(token);
			res.locals.jwtPayload = payload;

			//res.setHeader('token', payload.getSignedToken());

			next();
		} catch (error) {
			res.status(401).send('Invalid authentification token');
			return;
		}
	}

	return;
};
