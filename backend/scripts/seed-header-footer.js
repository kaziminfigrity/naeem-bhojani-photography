
import dotenv from "dotenv";
import mongoose from "mongoose";

import WebsiteSettings from "../src/models/websiteSettings.model.js";

dotenv.config();

// --------------------------------------
// DEFAULT HEADER SETTINGS
// --------------------------------------

const defaultHeader = {
  siteName: "Naeem Bhojani Photography",

  socialLinks: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
  },

  navigation: [
    { label: "About", href: "/about", order: 1, isActive: true },
    { label: "Services", href: "/services", order: 2, isActive: true },
    { label: "Gallery", href: "/gallery", order: 3, isActive: true },
    { label: "Testimonials", href: "/testimonials", order: 4, isActive: true },
    { label: "Contact", href: "/contact", order: 5, isActive: true },
  ],

  headerCTA: {
    label: "Book a Session",
    href: "/contact",
    isActive: true,
  },
};

// --------------------------------------
// DEFAULT FOOTER SETTINGS
// --------------------------------------

const defaultFooter = {
  description:
    "Preserving the emotions, the little details and the unforgettable moments that make your story uniquely yours.",

  tagline: "Capturing timeless stories, one frame at a time.",

  ctaEyebrow: "Your story deserves to be captured",

  ctaHeading: "Let's create something timeless.",

  exploreTitle: "Explore",

  quickLinks: [
    { label: "Home", href: "/", order: 1, isActive: true },
    { label: "About Us", href: "/about", order: 2, isActive: true },
    { label: "Our Services", href: "/services", order: 3, isActive: true },
    { label: "Gallery", href: "/gallery", order: 4, isActive: true },
    { label: "Testimonials", href: "/testimonials", order: 5, isActive: true },
    { label: "Contact Us", href: "/contact", order: 6, isActive: true },
  ],

  servicesTitle: "Our Services",

  services: [
    { label: "Wedding Photography", href: "/services", order: 1, isActive: true },
    { label: "Pre-Wedding Photography", href: "/services", order: 2, isActive: true },
    { label: "Birthday Photography", href: "/services", order: 3, isActive: true },
    { label: "Family Portraits", href: "/services", order: 4, isActive: true },
    { label: "Corporate Events", href: "/services", order: 5, isActive: true },
    { label: "Product Photography", href: "/services", order: 6, isActive: true },
  ],

  contactTitle: "Get in Touch",

  phoneLabel: "Call Us",

  emailLabel: "Email Us",

  locationLabel: "Studio Location",

  privacyPolicy: {
    label: "Privacy Policy",
    href: "/privacy-policy",
    isActive: true,
  },

  terms: {
    label: "Terms & Conditions",
    href: "/terms",
    isActive: true,
  },

  copyrightText: "All rights reserved.",
};

// --------------------------------------
// HELPER FUNCTIONS
// --------------------------------------

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

const fillMissingFields = (target, defaults, prefix = "") => {
  let changed = false;

  for (const key of Object.keys(defaults)) {
    const currentValue = target[key];
    const defaultValue = defaults[key];

    const fieldName = prefix ? `${prefix}.${key}` : key;

    if (isEmpty(currentValue)) {
      target[key] = defaultValue;
      console.log(`  + ${fieldName}: default value added`);
      changed = true;
      continue;
    }

    if (
      typeof defaultValue === "object" &&
      !Array.isArray(defaultValue) &&
      defaultValue !== null
    ) {
      if (
        typeof currentValue === "object" &&
        !Array.isArray(currentValue) &&
        currentValue !== null
      ) {
        if (fillMissingFields(currentValue, defaultValue, fieldName)) {
          changed = true;
        }
      }
    }
  }

  return changed;
};

// Merge default array items without deleting existing items.
const mergeDefaultArray = (existingItems, defaultItems, fieldName) => {
  let changed = false;

  const items = Array.isArray(existingItems) ? existingItems : [];

  for (const defaultItem of defaultItems) {
    const existingItem = items.find(
      (item) =>
        item.href === defaultItem.href &&
        item.label === defaultItem.label
    );

    if (existingItem) {
      if (fillMissingFields(existingItem, defaultItem, fieldName)) {
        changed = true;
      }
    } else {
      items.push({ ...defaultItem });
      console.log(`  + ${fieldName}: ${defaultItem.label} added`);
      changed = true;
    }
  }

  return { items, changed };
};

// --------------------------------------
// MIGRATION
// --------------------------------------

const seedHeaderFooter = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected.\n");

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      console.log("Website settings not found. Creating document...");

      settings = new WebsiteSettings({
        siteName: defaultHeader.siteName,
      });
    }

    let changed = false;

    // HEADER
    console.log("Migrating Header Settings...");

    if (
      isEmpty(settings.siteName)
    ) {
      settings.siteName = defaultHeader.siteName;
      console.log("  + siteName added");
      changed = true;
    }

    if (
      fillMissingFields(
        settings.socialLinks,
        defaultHeader.socialLinks,
        "socialLinks"
      )
    ) {
      changed = true;
    }

    if (
      fillMissingFields(
        settings.headerCTA,
        defaultHeader.headerCTA,
        "headerCTA"
      )
    ) {
      changed = true;
    }

    const navigationResult = mergeDefaultArray(
      settings.navigation,
      defaultHeader.navigation,
      "navigation"
    );

    if (navigationResult.changed) {
      settings.navigation = navigationResult.items;
      changed = true;
    }

    // FOOTER
    console.log("\nMigrating Footer Settings...");

    if (!settings.footer) {
      settings.footer = {};
      changed = true;
    }

    const footer = settings.footer;

    const footerDefaults = { ...defaultFooter };

    delete footerDefaults.quickLinks;
    delete footerDefaults.services;

    if (
      fillMissingFields(
        footer,
        footerDefaults,
        "footer"
      )
    ) {
      changed = true;
    }

    const quickLinksResult = mergeDefaultArray(
      footer.quickLinks,
      defaultFooter.quickLinks,
      "footer.quickLinks"
    );

    if (quickLinksResult.changed) {
      footer.quickLinks = quickLinksResult.items;
      changed = true;
    }

    const servicesResult = mergeDefaultArray(
      footer.services,
      defaultFooter.services,
      "footer.services"
    );

    if (servicesResult.changed) {
      footer.services = servicesResult.items;
      changed = true;
    }

    // SAVE ONLY IF CHANGES EXIST
    if (changed) {
      await settings.save();
      console.log("\nHeader & Footer migration saved successfully.");
    } else {
      console.log("\nHeader & Footer settings are already up to date.");
    }

    // VERIFICATION
    console.log("\n========== VERIFICATION ==========");

    const verifiedSettings = await WebsiteSettings.findById(
      settings._id
    ).lean();

    console.log("Website Name:", verifiedSettings.siteName);

    console.log(
      "Navigation Items:",
      verifiedSettings.navigation?.length || 0
    );

    console.log(
      "Social Links:",
      Object.keys(verifiedSettings.socialLinks || {}).length
    );

    console.log(
      "Header CTA:",
      verifiedSettings.headerCTA?.label || "Missing"
    );

    console.log(
      "Footer Quick Links:",
      verifiedSettings.footer?.quickLinks?.length || 0
    );

    console.log(
      "Footer Services:",
      verifiedSettings.footer?.services?.length || 0
    );

    console.log(
      "Footer Description:",
      verifiedSettings.footer?.description || "Missing"
    );

    console.log("\nMigration completed successfully.");
  } catch (error) {
    console.error("\nHeader & Footer migration failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("\nMongoDB disconnected.");
  }
};

seedHeaderFooter();
