import { Router } from "express";
import {
  getMessagesHandler,
  sendMessageHandler,
} from "../controllers/message.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/send", isAuth, sendMessageHandler);
router.get("/", isAuth, getMessagesHandler);

export default router;
