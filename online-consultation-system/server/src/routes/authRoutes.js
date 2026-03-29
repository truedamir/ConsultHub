import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/authController.js";

console.log("authRoutes loaded");

const router = express.Router();

router.post("/register", registerUser);
router.put("/profile", protect, updateProfile);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;