import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import { JwtPayload } from "../model/JwtPayload";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwt_payload: JwtPayload;

  try {
    jwt_payload = <JwtPayload>jwt.verify(token, config.jwt_secret);
    res.locals.jwt_payload = jwt_payload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const newToken = jwt.sign(jwt_payload, config.jwt_secret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
};
