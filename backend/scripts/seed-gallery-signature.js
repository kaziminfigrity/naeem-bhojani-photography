
import dotenv from "dotenv";
import mongoose from "mongoose";
import Gallery from "../src/models/gallery.model.js";

dotenv.config();

const defaultSignatureFeature = {
  isActive: true,
  eyebrow: "Our Signature Gallery",
  heading: "Captured Stories,",
  highlightedText: "Timeless Emotions",
  description:
    "A handpicked showcase of our finest work — from magical weddings to meaningful celebrations, every frame tells a story you’ll always remember.",
  backgroundImage: "/images/gallery/gallery-signature-bg.png",
  backgroundImageAlt:
    "A cinematic collage of wedding, portrait and celebration photography",

  highlights: [
    {
      icon: "camera",
      title: "Premium",
      subtitle: "Photography",
      order: 1,
      isActive: true,
    },
    {
      icon: "layers",
      title: "Curated",
      subtitle: "Collections",
      order: 2,
      isActive: true,
    },
    {
      icon: "play",
      title: "Cinematic",
      subtitle: "Albums",
      order: 3,
      isActive: true,
    },
    {
      icon: "heart",
      title: "Real",
      subtitle: "Emotions",
      order: 4,
      isActive: true,
    },
  ],

  exploreButton: {
    label: "Explore the Gallery",
    href: "#gallery-collections",
    isActive: true,
  },

  reelButton: {
    label: "Watch Showcase Reel",
    href: "",
    isActive: false,
  },
};

const seedGallerySignature = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    let gallery = await Gallery.findOne();

    if (!gallery) {
      gallery = await Gallery.create({
        signatureFeature: defaultSignatureFeature,
      });

      console.log("Gallery document created with Signature Feature.");
    } else {
      const existing = await Gallery.collection.findOne(
        { _id: gallery._id },
        { projection: { signatureFeature: 1 } }
      );

      if (existing?.signatureFeature) {
        console.log(
          "Signature Feature already exists. Existing data preserved."
        );
      } else {
        await Gallery.collection.updateOne(
          { _id: gallery._id },
          {
            $set: {
              signatureFeature: defaultSignatureFeature,
            },
          }
        );

        console.log("Signature Feature added to existing Gallery document.");
      }
    }

    const verification = await Gallery.collection.findOne(
      {},
      { projection: { signatureFeature: 1 } }
    );

    console.log("\nSignature Feature Verification:");
    console.log("Active:", verification?.signatureFeature?.isActive);
    console.log("Heading:", verification?.signatureFeature?.heading);
    console.log(
      "Background:",
      verification?.signatureFeature?.backgroundImage
    );
    console.log(
      "Highlights:",
      verification?.signatureFeature?.highlights?.length || 0
    );

    console.log("\nGallery Signature migration completed.");
  } catch (error) {
    console.error("Gallery Signature migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedGallerySignature();
