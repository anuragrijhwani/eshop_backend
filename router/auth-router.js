import express from "express";
import { login, registration, user } from "../control/auth-control.js";
import { validate } from "../middleware/validate-middleware.js";
import {
  auth_validation,
  login_validation,
} from "../validators/auth-validator.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/registration").post(validate(auth_validation), registration);
router.route("/login").post(validate(login_validation), login);
router.route("/user").get(authMiddleware, user);

export default router;
