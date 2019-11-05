import { Router } from "express";
import PlayerController from "../controller/PlayerController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.get(
  "/:name(.{4,})",
  [checkJwt],
  PlayerController.findOneByName
);

router.post("/", PlayerController.newPlayer);

export default router;