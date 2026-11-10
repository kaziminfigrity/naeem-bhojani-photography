
import express from "express";
import {
  getWebsiteSettings,
  updateWebsiteSettings,
} from "../controllers/settings.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get website settings
router.get("/", getWebsiteSettings);

// Update website settings (Admin only)
router.put("/", protectAdmin, updateWebsiteSettings);

export default router;
