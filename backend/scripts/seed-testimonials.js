
import dotenv from "dotenv";
import mongoose from "mongoose";
import TestimonialsPage from "../src/models/testimonials.model.js";

dotenv.config();

/*
  SAFE TESTIMONIALS DEFAULTS MIGRATION

  - Preserves existing populated values.
  - Fills missing fields.
  - Preserves existing testimonials.
  - Avoids duplicate testimonials.
  - Safe to run multiple times.
*/

const testimonialsSeedData = {
  hero: {
    eyebrow: "Real Stories",
    heading: "Client Testimonials",
    description: "",
    backgroundImage: "/images/testimonials-hero.png",
    backgroundImageAlt:
      "Romantic wedding photography at golden hour",
  },

  reviewsSection: {
    backgroundImage: "/images/testimonials-bg.png",
    eyebrow: "What Our Clients Say",
    heading: "Words That Mean the Most",
    description:
      "Every message reminds us why we do what we love. Here are some heartfelt words from our clients.",
    testimonials: [],
  },

  finalCTA: {
    backgroundImage: "/images/final-story-cta.png",
    backgroundImageAlt:
      "Photography memories and a collection of beautiful moments",
    eyebrow: "Let’s Create Together",
    heading: "Turn Your Moments into Timeless Memories",
    description: "",
    buttonLabel: "Book a Session",
    buttonHref: "/contact",
  },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "");

const getItemKey = (item) => {
  if (!item) return null;

  if (typeof item !== "object") {
    return `value:${item}`;
  }

  if (item._id) {
    return `id:${item._id.toString()}`;
  }

  if (item.name && item.review) {
    return `testimonial:${item.name.trim().toLowerCase()}|${item.review.trim().toLowerCase()}`;
  }

  return null;
};

const toPlainObject = (item) => {
  if (item && typeof item.toObject === "function") {
    return item.toObject();
  }

  return item;
};

const mergeMissingFields = (current, fallback) => {
  const result = { ...current };
  let changed = false;

  for (const [key, defaultValue] of Object.entries(fallback)) {
    if (key === "_id") continue;

    if (isEmptyValue(result[key])) {
      result[key] = defaultValue;
      changed = true;
    }
  }

  return { result, changed };
};

const mergeArray = (currentArray, defaultArray) => {
  const currentItems = Array.isArray(currentArray)
    ? currentArray.map(toPlainObject)
    : [];

  let changed = false;

  for (const defaultItem of defaultArray) {
    const defaultKey = getItemKey(defaultItem);

    const existingIndex = currentItems.findIndex(
      (item) => getItemKey(item) === defaultKey && defaultKey
    );

    if (existingIndex === -1) {
      currentItems.push(defaultItem);
      changed = true;

      console.log(`  + Added item: ${defaultKey || "new item"}`);
      continue;
    }

    const { result, changed: itemChanged } =
      mergeMissingFields(
        currentItems[existingIndex],
        defaultItem
      );

    if (itemChanged) {
      currentItems[existingIndex] = result;
      changed = true;

      console.log(`  + Filled missing fields: ${defaultKey}`);
    }
  }

  return { result: currentItems, changed };
};

// ==========================================
// MIGRATE SECTION
// ==========================================

const migrateSection = (document, sectionName, sectionDefaults) => {
  const currentSection = document.get(sectionName) || {};

  let updated = false;

  for (const [field, defaultValue] of Object.entries(sectionDefaults)) {
    const currentValue = currentSection[field];

    if (Array.isArray(defaultValue)) {
      const { result, changed } = mergeArray(
        currentValue,
        defaultValue
      );

      if (changed || !Array.isArray(currentValue)) {
        document.set(`${sectionName}.${field}`, result);
        updated = true;
      }
    } else if (isEmptyValue(currentValue)) {
      document.set(`${sectionName}.${field}`, defaultValue);

      console.log(`  + ${field}: default value added`);
      updated = true;
    }
  }

  if (!updated) {
    console.log(`  - ${sectionName}: already up to date`);
  }

  return updated;
};

// ==========================================
// RUN TESTIMONIALS MIGRATION
// ==========================================

async function runMigration() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing from backend .env file."
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected.");

    let testimonials = await TestimonialsPage.findOne();

    if (!testimonials) {
      testimonials = new TestimonialsPage({});
      console.log("No Testimonials document found. Creating one.");
    }

    let changed = false;

    for (const [sectionName, sectionDefaults] of Object.entries(
      testimonialsSeedData
    )) {
      console.log(`\nMigrating ${sectionName}...`);

      const sectionChanged = migrateSection(
        testimonials,
        sectionName,
        sectionDefaults
      );

      if (sectionChanged) {
        changed = true;
      }
    }

    if (changed || testimonials.isNew) {
      await testimonials.save();
      console.log("\nTestimonials migration saved successfully.");
    } else {
      console.log("\nNo changes required. Existing data preserved.");
    }

    const verifyTestimonials = await TestimonialsPage.findOne().lean();

    console.log("\nTestimonials verification:");

    console.log(
      "Hero:",
      verifyTestimonials?.hero?.heading || "Not found"
    );

    console.log(
      "Review items:",
      verifyTestimonials?.reviewsSection?.testimonials?.length ?? 0
    );

    console.log(
      "Final CTA:",
      verifyTestimonials?.finalCTA?.heading || "Not found"
    );

    console.log("\nTestimonials migration completed successfully.");
  } catch (error) {
    console.error("\nTestimonials migration failed:", error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected.");
    }
  }
}

runMigration();
