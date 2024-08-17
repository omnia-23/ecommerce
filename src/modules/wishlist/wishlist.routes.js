import { Router } from "express";
import {
  addWishlist,
  getWishlist,
  deleteWishlist,
} from "./controller/wishlist.controller.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
  .get("/", getWishlist)
  .post("/", authentication, authorization([roles.user]), addWishlist)
  .delete("/", authentication, authorization([roles.user]), deleteWishlist);
export default router;
