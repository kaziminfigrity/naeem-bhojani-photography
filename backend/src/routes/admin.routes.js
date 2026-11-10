
import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route
router.post("/login", loginAdmin);

// Protected test route
router.get("/profile", protectAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected admin route accessed successfully",
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

export default router;
