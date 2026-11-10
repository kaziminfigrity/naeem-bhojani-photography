
import express from "express";

import { uploadHomepageImage } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.middleware.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/homepage",
  protectAdmin,
  upload.single("image"),
  uploadHomepageImage
);

export default router;
