import { Router } from "express";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "./controller/review.controller.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
  .get("/", getReviews)
  .post("/", authentication, authorization([roles.user]), addReview)
  .put(
    "/:id",
    authentication,
    authorization([roles.admin, roles.user]),
    updateReview
  )
  .delete(
    "/:id",
    authentication,
    authorization([roles.admin, roles.user]),
    deleteReview
  );
export default router;
