
import express from "express";

import {
  createContactEnquiry,
  getAllContactEnquiries,
  getSingleContactEnquiry,
  updateContactEnquiry,
  deleteContactEnquiry,
} from "../controllers/contact-enquiry.controller.js";

import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route - Submit Contact Enquiry
router.post("/", createContactEnquiry);

// Protected route - Get All Contact Enquiries
router.get("/", protectAdmin, getAllContactEnquiries);

// Protected route - Get Single Contact Enquiry
router.get("/:id", protectAdmin, getSingleContactEnquiry);

// Protected route - Update Contact Enquiry
router.put("/:id", protectAdmin, updateContactEnquiry);

// Protected route - Delete Contact Enquiry
router.delete("/:id", protectAdmin, deleteContactEnquiry);

export default router;
