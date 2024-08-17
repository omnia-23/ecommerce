import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
} from "./controller/address.controller.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import roles from "../../types/roles.js";

const router = Router();
router
  .get("/", getAddress)
  .post("/", authentication, authorization([roles.user]), addAddress)
  .delete("/:id", authentication, authorization([roles.user]), deleteAddress);
export default router;
