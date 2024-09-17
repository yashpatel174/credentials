import express from "express";
import {
  register,
  login,
  dashboard,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controller/credentialController.js";
import { authMiddleware } from "../middleware/authMiddelware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.post("/dashboard", authMiddleware, dashboard);

export default router;
