import { Router } from "express";
import { Login, signUp } from "./controller/auth.controller.js";
const router = Router();

router.post("/signup", signUp);
router.post("/login", Login);

export default router;
