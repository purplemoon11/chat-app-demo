import { Router } from "express";
import AuthRoute from "./auth.route";
import MessageRoute from "./message.route";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/message", MessageRoute);

export default router;
