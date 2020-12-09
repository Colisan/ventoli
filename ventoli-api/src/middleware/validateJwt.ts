import { Request, Response, NextFunction } from 'express';
import JwtPayload from '../model/JwtPayload';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
	let token: string;

	if (!(token = req.headers.authorization?.split(' ')[1])) {
    res.status(400).send("Require authentification token");
    return;
	}

  let payload: JwtPayload;

  try {
		payload = JwtPayload.fromSignedToken(token);
		res.locals.jwtPayload = payload;
  } catch (error) {
    res.status(401).send("Invalid authentification token");
    return;
  }

  //res.setHeader('token', payload.getSignedToken());

  next();
};
