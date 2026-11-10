
import express from "express";

import {
  getTestimonials,
  updateTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonials.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route - Get Testimonials page content
router.get("/", getTestimonials);

// Protected route - Update Testimonials page content
router.put("/", protectAdmin, updateTestimonials);


// Testimonial CRUD Routes
router.post("/reviews", protectAdmin, addTestimonial);
router.put("/reviews/:id", protectAdmin, updateTestimonial);
router.delete("/reviews/:id", protectAdmin, deleteTestimonial);

export default router;
