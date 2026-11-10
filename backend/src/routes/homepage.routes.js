
import express from "express";

import {
  getHomepageContent,
  updateHomepageContent,
} from "../controllers/homepage.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route: Get homepage content
router.get("/", getHomepageContent);

// Protected route: Update homepage content
router.put("/", protectAdmin, updateHomepageContent);

export default router;
