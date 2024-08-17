import { Router } from "express";
import * as cartController from './controller/cart.controller.js'
import {
    authentication,
    authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
    //   .get("/", getCoupons)
    .post("/", authentication, authorization([roles.user]), cartController.addcart)
    .post("/applyCoupon", authentication, authorization([roles.user]), cartController.applyCoupon)
    .put("/:_id", authentication, authorization([roles.user]), cartController.deleteProduct)
    .put("/updateQuantity/:_id", authentication, authorization([roles.user]), cartController.updateQuantity)

export default router;
