import { Router } from "express";
import * as orderController from "./controller/order.controller.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router.post(
  "/",
  authentication,
  authorization([roles.user]),
  orderController.addCashOrder
);

export default router;
