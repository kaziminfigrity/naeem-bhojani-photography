
import express from "express";

import {
  getServicesContent,
  updateServicesContent,
} from "../controllers/services.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route: Get Services page content
router.get("/", getServicesContent);

// Protected route: Update Services page content
router.put("/", protectAdmin, updateServicesContent);

export default router;
