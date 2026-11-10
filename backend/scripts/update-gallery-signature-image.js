
import dotenv from "dotenv";
import mongoose from "mongoose";
import Gallery from "../src/models/gallery.model.js";

dotenv.config();

const updateGallerySignatureImage = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    const updatedGallery = await Gallery.findOneAndUpdate(
      {},
      {
        $set: {
          "signatureFeature.backgroundImage":
            "/images/gallery-signature-bg.png",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGallery) {
      throw new Error("Gallery document not found.");
    }

    console.log(
      "Updated backgroundImage:",
      updatedGallery.signatureFeature.backgroundImage
    );

    console.log("Gallery signature image migration completed.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

updateGallerySignatureImage();
