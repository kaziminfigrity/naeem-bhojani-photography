
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/admin.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import homepageRoutes from "./routes/homepage.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import testimonialsRoutes from "./routes/testimonials.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import contactEnquiryRoutes from "./routes/contact-enquiry.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Naeem Bhojani Photography API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-enquiries", contactEnquiryRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
