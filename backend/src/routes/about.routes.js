
import express from "express";

import {
  getAbout,
  updateAbout,
} from "../controllers/about.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public API
router.get("/", getAbout);

// Admin Protected API
router.put("/", protectAdmin, updateAbout);

export default router;
