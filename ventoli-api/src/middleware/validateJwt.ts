import { Request, Response, NextFunction } from 'express';
import JwtPayload from '../model/JwtPayload';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.auth as string;
  let payload: JwtPayload;

  try {
    payload = JwtPayload.fromSignedToken(token);
    res.locals.jwtPayload = payload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  res.setHeader('token', payload.getSignedToken());

  next();
};
