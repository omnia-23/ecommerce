import { Router } from "express";
import { updatePassword } from "./controller/user.controller.js";
import { authentication } from "../../middleware/auth.middleware.js";

const router = Router();
router.post("/", authentication, updatePassword);
export default router;
