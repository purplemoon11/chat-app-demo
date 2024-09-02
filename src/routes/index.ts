import { Router } from "express";
import AuthRoute from "./auth.route";

const router = Router();

router.use("/auth", AuthRoute);

export default router;
