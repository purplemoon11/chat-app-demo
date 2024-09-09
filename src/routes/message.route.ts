import { Router, Request, Response, NextFunction } from "express";
import {
  getMessagesHandler,
  searchMessagesHandler,
  sendMessageHandler,
} from "../controllers/message.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/send", isAuth, sendMessageHandler);
router.get("/", isAuth, getMessagesHandler);
router.get("/search", isAuth, searchMessagesHandler);
router.get("/send", (req: Request, res: Response) => {
  res.render("chat", {
    message: null,
    error: null,
  });
});

export default router;
