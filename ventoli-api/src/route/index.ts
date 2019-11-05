import { Router } from "express";
import auth from "./auth";
import player from "./player";

const routes = Router();

routes.use("/auth", auth);
routes.use("/player", player);

export default routes;
