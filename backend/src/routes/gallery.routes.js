
import express from "express";

import {
  getGallery,
  updateGallery,
} from "../controllers/gallery.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route - Get Gallery content
router.get("/", getGallery);

// Protected route - Update Gallery content
router.put("/", protectAdmin, updateGallery);

export default router;
