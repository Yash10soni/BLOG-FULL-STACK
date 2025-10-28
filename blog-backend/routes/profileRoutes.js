import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/:user_id", getProfile);
router.post("/", createProfile);
router.put("/:user_id", updateProfile);
router.delete("/:user_id", deleteProfile);

export default router;
