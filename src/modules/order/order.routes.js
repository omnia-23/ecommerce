import { Router } from "express";
import * as orderController from './controller/order.controller.js'
import {
    authentication,
    authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
    //   .get("/", getCoupons)
    .post("/", authentication, authorization([roles.user]), orderController.addCashOrder)
// .post("/applyCoupon", authentication, authorization([roles.user]), cartController.applyCoupon)
// .put("/:_id", authentication, authorization([roles.user]), cartController.deleteProduct)
// .put("/updateQuantity/:_id", authentication, authorization([roles.user]), cartController.updateQuantity)

export default router;
