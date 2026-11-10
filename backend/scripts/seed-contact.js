
import dotenv from "dotenv";
import mongoose from "mongoose";

import ContactPage from "../src/models/contact.model.js";

dotenv.config();

/*
  SAFE CONTACT PAGE DEFAULTS MIGRATION

  - Creates Contact Page document if it does not exist.
  - Fills missing/empty fields only.
  - Preserves existing populated values.
  - Adds missing default event types without duplicates.
  - Preserves existing contact items.
  - Does not invent contact details.
  - Safe to run multiple times.
*/

// ==========================================
// 1. CONTACT PAGE DEFAULT DATA
// ==========================================

const contactSeedData = {
  hero: {
    eyebrow: "Get in Touch",
    heading: "Let’s Create Something Beautiful",
    description:
      "We’d love to hear from you. Whether it’s a wedding, a special event, a portrait session, or a creative project — let’s bring your vision to life together.",
    backgroundImage: "/images/contact-hero.png",
    backgroundImageAlt:
      "Bride and groom in a beautiful wedding setting",
    supportingText: "Every moment deserves to be remembered",
  },

  contactSection: {
    backgroundImage: "/images/contact-section-bg.png",
    heading: "Let’s Talk About Your Special Moments",
    description:
      "Feel free to reach out to us through any of the following channels. We’re always happy to connect and discuss your photography needs.",
    formHeading: "Book a Session",
    formDescription:
      "Fill out the form below and we’ll get back to you as soon as possible.",
    privacyNote:
      "Your details will be used only to respond to your enquiry.",

    // Contact items are intentionally not invented.
    contactItems: [],

    eventTypes: [
      "Wedding",
      "Pre-Wedding",
      "Birthday",
      "Maternity",
      "Corporate Event",
      "Sports Event",
      "Product Photography",
      "Education Event",
      "Other",
    ],
  },

  locationSection: {
    eyebrow: "Our Location",
    heading: "Visit Our Studio",
    description:
      "We’d be happy to welcome you to our studio. Let’s meet, discuss your ideas and plan something extraordinary together.",
    backgroundImage: "/images/contact-location-bg.png",
    studioName: "Naeem Bhojani Photography",
    address: "Ahmedabad, Gujarat, India",
    mapQuery: "Naeem Bhojani Photography, Ahmedabad, Gujarat, India",
    directionsUrl: "",
    locationNote:
      "Let’s plan your next photography session.",
    mapCaption: "AHMEDABAD, GUJARAT, INDIA",
  },
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

const isEmptyValue = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

// ==========================================
// 3. MERGE ARRAY WITHOUT DUPLICATES
// ==========================================

const mergeStringArray = (currentItems, defaultItems) => {
  const result = Array.isArray(currentItems)
    ? [...currentItems]
    : [];

  let changed = !Array.isArray(currentItems);

  for (const defaultItem of defaultItems) {
    const exists = result.some(
      (item) =>
        String(item).trim().toLowerCase() ===
        String(defaultItem).trim().toLowerCase()
    );

    if (!exists) {
      result.push(defaultItem);
      changed = true;

      console.log(`  + Added event type: ${defaultItem}`);
    }
  }

  return { result, changed };
};

// ==========================================
// 4. MIGRATE CONTACT SECTION
// ==========================================

const migrateSection = (
  contact,
  sectionName,
  sectionDefaults
) => {
  const currentSection = contact.get(sectionName) || {};

  let updated = false;

  for (const [field, defaultValue] of Object.entries(
    sectionDefaults
  )) {
    const currentValue = currentSection[field];

    if (field === "eventTypes") {
      const { result, changed } = mergeStringArray(
        currentValue,
        defaultValue
      );

      if (changed) {
        contact.set(`${sectionName}.${field}`, result);
        updated = true;
      }

      continue;
    }

    if (field === "contactItems") {
      if (!Array.isArray(currentValue)) {
        contact.set(`${sectionName}.${field}`, []);
        updated = true;

        console.log("  + contactItems: empty array initialized");
      }

      continue;
    }

    if (isEmptyValue(currentValue)) {
      contact.set(`${sectionName}.${field}`, defaultValue);

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
// 5. RUN CONTACT PAGE MIGRATION
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

    let contact = await ContactPage.findOne();

    if (!contact) {
      contact = new ContactPage({});

      console.log(
        "No Contact document found. Creating one."
      );
    }

    let changed = false;

    for (const [sectionName, sectionDefaults] of Object.entries(
      contactSeedData
    )) {
      console.log(`\nMigrating ${sectionName}...`);

      const sectionChanged = migrateSection(
        contact,
        sectionName,
        sectionDefaults
      );

      if (sectionChanged) {
        changed = true;
      }
    }

    if (changed || contact.isNew) {
      await contact.save();

      console.log(
        "\nContact migration saved successfully."
      );
    } else {
      console.log(
        "\nNo changes required. Existing data preserved."
      );
    }

    // ==========================================
    // 6. VERIFY CONTACT PAGE DATA
    // ==========================================

    const verifyContact = await ContactPage.findOne().lean();

    console.log("\nContact Page Verification:");

    console.log(
      "Hero Heading:",
      verifyContact?.hero?.heading
    );

    console.log(
      "Contact Items:",
      verifyContact?.contactSection?.contactItems?.length ?? 0
    );

    console.log(
      "Event Types:",
      verifyContact?.contactSection?.eventTypes?.length ?? 0
    );

    console.log(
      "Studio Name:",
      verifyContact?.locationSection?.studioName
    );

    console.log(
      "\nContact migration completed successfully."
    );
  } catch (error) {
    console.error(
      "\nContact migration failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();

      console.log("MongoDB disconnected.");
    }
  }
}

runMigration();
