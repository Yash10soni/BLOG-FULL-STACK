import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET LOGGED-IN USER PROFILE
router.get("/me", authMiddleware, getMyProfile);

// UPDATE LOGGED-IN USER PROFILE
router.put("/me", authMiddleware, updateMyProfile);

export default router;
