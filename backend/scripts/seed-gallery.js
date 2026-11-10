
import dotenv from "dotenv";
import mongoose from "mongoose";
import Gallery from "../src/models/gallery.model.js";

dotenv.config();

const galleryDefaults = {
  hero: {
    eyebrow: "THE ART OF STORYTELLING",
    heading: "Every Frame Tells a Story",
    description:
      "Explore a curated collection of timeless moments, genuine emotions, and beautiful stories captured through the lens.",
    backgroundImage: "/images/gallery/gallery-hero.jpg",
    backgroundImageAlt: "A cinematic photography collection",
    buttons: [
      { label: "Explore Collection", href: "#gallery-collections", order: 1 },
      { label: "Watch Our Story", href: "/films", order: 2 },
    ],
    decorativeCaption: ["Moments", "Made", "Timeless"],
  },

  collections: {
    eyebrow: "OUR PORTFOLIO",
    heading: "A Collection of Beautiful Stories",
    description:
      "From intimate celebrations to grand occasions, every photograph reflects a story worth remembering.",
    categories: ["Wedding", "Portrait", "Fashion", "Events"],
    photos: [],
    bottomNote:
      "Every photograph is a story. Every story deserves to be remembered.",
    ctaLabel: "Start Your Story",
    ctaHref: "/contact",
  },

  signatureFeature: {
    isActive: true,
    eyebrow: "BEHIND THE LENS",
    heading: "More Than Just",
    highlightedText: "Photography",
    description:
      "We believe photography is more than capturing an image. It is about preserving emotions, celebrating connections, and creating timeless visual stories.",
    backgroundImage: "/images/gallery-signature-bg.png",
    backgroundImageAlt:
      "A cinematic composition showcasing photography equipment and captured moments",
    highlights: [
      {
        icon: "camera",
        title: "Photography",
        subtitle: "Authentic moments",
        order: 1,
        isActive: true,
      },
      {
        icon: "layers",
        title: "Creativity",
        subtitle: "Artistic vision",
        order: 2,
        isActive: true,
      },
      {
        icon: "play",
        title: "Cinematography",
        subtitle: "Stories in motion",
        order: 3,
        isActive: true,
      },
      {
        icon: "heart",
        title: "Passion",
        subtitle: "Made with love",
        order: 4,
        isActive: true,
      },
    ],
    exploreButton: {
      label: "Explore Our Work",
      href: "#gallery-collections",
      isActive: true,
    },
    reelButton: {
      label: "Watch Showreel",
      href: "/films",
      isActive: true,
    },
  },

  finalCTA: {
    backgroundImage: "/images/gallery/gallery-cta.jpg",
    backgroundImageAlt: "Elegant photography background",
    eyebrow: "LET'S CREATE SOMETHING TIMELESS",
    heading: "Your Story Deserves to Be Remembered",
    description:
      "Let's turn your special moments into timeless photographs that you will treasure forever.",
    buttonLabel: "Book Your Session",
    buttonHref: "/contact",
  },
};

// Only fill missing, null, or empty values.
// Existing populated values are always preserved.
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

const mergeMissing = (target, defaults) => {
  let changed = false;

  Object.entries(defaults).forEach(([key, defaultValue]) => {
    const currentValue = target[key];

    if (isEmpty(currentValue)) {
      target[key] = defaultValue;
      changed = true;
      return;
    }

    if (
      defaultValue &&
      typeof defaultValue === "object" &&
      !Array.isArray(defaultValue) &&
      currentValue &&
      typeof currentValue === "object" &&
      !Array.isArray(currentValue)
    ) {
      if (mergeMissing(currentValue, defaultValue)) {
        changed = true;
      }
    }
  });

  return changed;
};

const seedGallery = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    let gallery = await Gallery.findOne();

    if (!gallery) {
      gallery = new Gallery({});
      console.log("Creating new Gallery document...");
    }

    let changed = false;

    for (const [section, defaults] of Object.entries(galleryDefaults)) {
      const currentSection = gallery.get(section);

      if (!currentSection) {
        gallery.set(section, defaults);
        changed = true;
        console.log(`Added ${section} section.`);
        continue;
      }

      const sectionData =
        typeof currentSection.toObject === "function"
          ? currentSection.toObject()
          : currentSection;

      if (mergeMissing(sectionData, defaults)) {
        gallery.set(section, sectionData);
        changed = true;
        console.log(`Updated missing fields in ${section}.`);
      }
    }

    if (changed) {
      await gallery.save();
      console.log("Gallery seed updated successfully.");
    } else {
      console.log("Gallery is already up to date. No changes needed.");
    }

    const verifiedGallery = await Gallery.findById(gallery._id).lean();

    console.log("\nGallery verification:");
    console.log({
      hero: Boolean(verifiedGallery?.hero),
      collections: Boolean(verifiedGallery?.collections),
      signatureFeature: {
        isActive: verifiedGallery?.signatureFeature?.isActive,
        backgroundImage:
          verifiedGallery?.signatureFeature?.backgroundImage,
        highlights:
          verifiedGallery?.signatureFeature?.highlights?.length || 0,
      },
      finalCTA: Boolean(verifiedGallery?.finalCTA),
    });
  } catch (error) {
    console.error("Gallery seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedGallery();
