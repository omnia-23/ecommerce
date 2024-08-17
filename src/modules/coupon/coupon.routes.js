import { Router } from "express";
import {
  deleteCoupon,
  addCoupon,
  getCoupons,
  updateCoupon,
} from "./controller/coupon.controller.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
  .get("/", getCoupons)
  .post("/", authentication, authorization([roles.admin]), addCoupon)
  .put("/:_id", authentication, authorization([roles.admin]), updateCoupon)
  .delete("/:_id", authentication, authorization([roles.admin]), deleteCoupon);
export default router;
