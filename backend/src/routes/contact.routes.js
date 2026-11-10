
import express from "express";

import {
  getContactPage,
  updateContactPage,
} from "../controllers/contact.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route - Get Contact Page
router.get("/", getContactPage);

// Protected route - Update Contact Page
router.put("/", protectAdmin, updateContactPage);

export default router;
