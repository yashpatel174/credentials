import express from "express";
import { register, login, logout, requestPasswordReset, resetPassword } from "../controller/credentialController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
