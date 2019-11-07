import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import JwtPayload from '../model/JwtPayload';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.auth as string;
  let payload: JwtPayload;

  try {
    payload = jwt.verify(token, config.jwt_secret) as JwtPayload;
    res.locals.jwtPayload = payload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  res.setHeader('token', payload.sign());

  next();
};
