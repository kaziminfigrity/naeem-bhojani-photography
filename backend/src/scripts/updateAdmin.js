
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

dotenv.config();

const updateAdmin = async () => {
  try {
    const {
      MONGODB_URI,
      ADMIN_EMAIL,
      NEW_ADMIN_EMAIL,
      NEW_ADMIN_PASSWORD,
    } = process.env;

    if (
      !MONGODB_URI ||
      !ADMIN_EMAIL ||
      !NEW_ADMIN_EMAIL ||
      !NEW_ADMIN_PASSWORD
    ) {
      throw new Error("Required environment variables are missing");
    }

    if (NEW_ADMIN_PASSWORD.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    await mongoose.connect(MONGODB_URI);

    const admin = await Admin.findOne({
      email: ADMIN_EMAIL.toLowerCase().trim(),
      role: "admin",
    });

    if (!admin) {
      throw new Error("Existing admin account not found");
    }

    const emailExists = await Admin.findOne({
      email: NEW_ADMIN_EMAIL.toLowerCase().trim(),
      _id: { $ne: admin._id },
    });

    if (emailExists) {
      throw new Error("New email is already in use");
    }

    admin.email = NEW_ADMIN_EMAIL.toLowerCase().trim();
    admin.password = await bcrypt.hash(NEW_ADMIN_PASSWORD, 12);

    await admin.save();

    console.log("Admin email and password updated successfully");
  } catch (error) {
    console.error("Admin update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

updateAdmin();
