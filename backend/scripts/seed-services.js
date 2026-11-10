import dotenv from "dotenv";
import mongoose from "mongoose";
import Services from "../src/models/services.model.js";

dotenv.config();

/*
  SAFE SERVICES DEFAULTS MIGRATION

  - Preserves existing populated values.
  - Fills missing fields.
  - Adds missing array items.
  - Avoids duplicate items.
  - Safe to run multiple times.
*/

const servicesSeedData = {
  hero: {
    eyebrow: "Our Services",
    heading: "Professional Photography Services",
    subtitle: "For Every Special Moment",
    description:
      "We capture real emotions, vibrant stories and timeless memories with creativity and perfection.",
    backgroundImage: "/images/services-hero.png",
    backgroundImageAlt:
      "Professional camera equipment and wedding photography prints",

    buttons: [
      {
        label: "Explore Services",
        href: "#all-services",
        order: 1,
      },
      {
        label: "Watch Showreel",
        href: "/gallery",
        order: 2,
      },
    ],

    stats: [
      {
        value: "10+",
        label: "Years of Experience",
        icon: "medal",
        order: 1,
        isActive: true,
      },
      {
        value: "500+",
        label: "Events Covered",
        icon: "camera",
        order: 2,
        isActive: true,
      },
      {
        value: "100%",
        label: "Client Satisfaction",
        icon: "badge-check",
        order: 3,
        isActive: true,
      },
      {
        value: "4.9",
        label: "Average Rating",
        icon: "star",
        order: 4,
        isActive: true,
      },
    ],
  },

  services: {
    eyebrow: "What We Do",
    heading: "Explore Our Services",
    description:
      "Professional photography services tailored to your special moments and unique needs.",
    secondaryDescription:
      "We believe every occasion has a story worth telling. Our services are designed to beautifully capture those stories with creativity and care.",
    closingText:
      "Every moment is unique. Let us create photographs you will treasure for a lifetime.",
    ctaLabel: "Discuss Your Project",
    ctaHref: "/contact",

    items: [
      {
        number: "01",
        title: "Wedding Photography",
        description:
          "Capturing your big day with a perfect blend of candid and traditional moments.",
        image:
          "/images/Festive Wedding Portrait Under Floral Arch.png",
        alt: "Beautiful Indian wedding couple portrait",
        href: "/contact",
        order: 1,
        isActive: true,
      },
      {
        number: "02",
        title: "Product Photography",
        description:
          "High-quality product shots that make your brand stand out in the market.",
        image: "/images/service-product.png",
        alt: "Premium product photography",
        href: "/contact",
        order: 2,
        isActive: true,
      },
      {
        number: "03",
        title: "Birthday Party",
        description:
          "Preserve the joy and excitement of your special celebrations.",
        image: "/images/service-birthday.png",
        alt: "Joyful birthday celebration",
        href: "/contact",
        order: 3,
        isActive: true,
      },
      {
        number: "04",
        title: "Head Shots",
        description:
          "Professional headshots for individuals and teams to create a lasting impression.",
        image: "/images/Thoughtful Attendee with Laptop.png",
        alt: "Professional corporate portrait",
        href: "/contact",
        order: 4,
        isActive: true,
      },
      {
        number: "05",
        title: "Baby Shower",
        description:
          "Beautifully capturing the precious moments of your new beginning.",
        image: "/images/philosophy-baby.png",
        alt: "Baby portrait photography",
        href: "/contact",
        order: 5,
        isActive: true,
      },
      {
        number: "06",
        title: "Sport Events",
        description:
          "Dynamic and high-energy coverage of your sports events and tournaments.",
        image: "/images/Cricket Celebration High-Five.png",
        alt: "Sports event photography",
        href: "/contact",
        order: 6,
        isActive: true,
      },
      {
        number: "07",
        title: "Corporate Events",
        description:
          "Professional coverage for conferences, seminars, and business events.",
        image: "/images/service-corporate.png",
        alt: "Corporate event and conference photography",
        href: "/contact",
        order: 7,
        isActive: true,
      },
      {
        number: "08",
        title: "Other Services",
        description:
          "Custom photography solutions tailored to your unique requirements.",
        image: "/images/Cinematic Canon EOS 5D Mark IV on Stone.png",
        alt: "Professional photography camera",
        href: "/contact",
        order: 8,
        isActive: true,
      },
    ],
  },

  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: "More Than Just Photography",
    description:
      "We don’t just take pictures, we capture emotions, connections, and stories that last a lifetime.",
    backgroundImage: "/images/why-choose-us-bg.png",
    backgroundImageAlt:
      "Photographer working with professional camera equipment",
    ctaLabel: "Book a Session",
    ctaHref: "/contact",

    features: [
      {
        title: "Professional Equipment",
        subtitle: "",
        description: "High-end gear for stunning results.",
        icon: "camera",
        order: 1,
        isActive: true,
      },
      {
        title: "Experienced Team",
        subtitle: "",
        description: "Years of experience in diverse events.",
        icon: "team",
        order: 2,
        isActive: true,
      },
      {
        title: "Creative Approach",
        subtitle: "",
        description: "Unique and artistic storytelling.",
        icon: "heart",
        order: 3,
        isActive: true,
      },
      {
        title: "Client Satisfaction",
        subtitle: "",
        description: "Your happiness is our priority.",
        icon: "star",
        order: 4,
        isActive: true,
      },
    ],
  },

  howItWorks: {
    eyebrow: "A Thoughtful Process",
    heading: "From Your Vision to Forever.",
    description:
      "Great photography is more than a beautiful image. It is a thoughtful experience, built around your story and finished with care in every detail.",
    closingHeading: "Every detail tells a story.",
    closingDescription:
      "Thoughtfully planned · Beautifully captured · Carefully delivered",

    steps: [
      {
        number: "01",
        eyebrow: "THE CONVERSATION",
        title: "Tell Us Your Story",
        description:
          "Every unforgettable photograph begins with a conversation. We listen to your vision, understand your style, and discover what matters most to you.",
        icon: "conversation",
        order: 1,
      },
      {
        number: "02",
        eyebrow: "THE PREPARATION",
        title: "Every Detail, Planned",
        description:
          "From location and lighting to the smallest personal touches, we thoughtfully prepare every detail to make your session feel effortless.",
        icon: "preparation",
        order: 2,
      },
      {
        number: "03",
        eyebrow: "THE ART OF CAPTURE",
        title: "Moments, Made Timeless",
        description:
          "When the moment arrives, we capture the genuine emotions, beautiful details, and spontaneous memories that make your story uniquely yours.",
        icon: "camera",
        order: 3,
      },
      {
        number: "04",
        eyebrow: "THE FINAL CHAPTER",
        title: "Memories to Keep Forever",
        description:
          "Each selected photograph is carefully refined and beautifully presented, ready for you to relive, share, and treasure for years to come.",
        icon: "gallery",
        order: 4,
      },
    ],
  },

  contactCTA: {
    eyebrow: "Let's Create Together",
    heading: "Let's Create Something Beautiful Together",
    description:
      "Ready to capture your special moments? Get in touch with us today and let's discuss your photography needs.",
    backgroundImage: "/images/contact-cta-bg.png",
    backgroundImageAlt:
      "A collection of wedding and portrait photography prints",
    buttonLabel: "Contact Us",
    buttonHref: "/contact",

    features: [
      {
        title: "Professional",
        subtitle: "Photography",
        description: "",
        icon: "camera",
        order: 1,
        isActive: true,
      },
      {
        title: "Memorable",
        subtitle: "Experiences",
        description: "",
        icon: "heart",
        order: 2,
        isActive: true,
      },
      {
        title: "Personalized",
        subtitle: "Support",
        description: "",
        icon: "users",
        order: 3,
        isActive: true,
      },
    ],
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
  if (item === undefined || item === null) return null;

  if (typeof item !== "object") {
    return `value:${item}`;
  }

  if (item.label) return `label:${item.label}`;
  if (item.title) return `title:${item.title}`;
  if (item.number) return `number:${item.number}`;
  if (item.value && item.label) {
    return `value:${item.value}|label:${item.label}`;
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
      mergeMissingFields(currentItems[existingIndex], defaultItem);

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
// RUN SERVICES MIGRATION
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

    let services = await Services.findOne();

    if (!services) {
      services = new Services({});
      console.log("No Services document found. Creating one.");
    }

    let changed = false;

    for (const [sectionName, sectionDefaults] of Object.entries(
      servicesSeedData
    )) {
      console.log(`\nMigrating ${sectionName}...`);

      const sectionChanged = migrateSection(
        services,
        sectionName,
        sectionDefaults
      );

      if (sectionChanged) {
        changed = true;
      }
    }

    if (changed || services.isNew) {
      await services.save();
      console.log("\nServices migration saved successfully.");
    } else {
      console.log("\nNo changes required. Existing data preserved.");
    }

    const verifyServices = await Services.findOne().lean();

    console.log("\nServices verification:");
    console.log(
      "Service items:",
      verifyServices?.services?.items?.length ?? 0
    );
    console.log(
      "How it works steps:",
      verifyServices?.howItWorks?.steps?.length ?? 0
    );

    console.log("\nServices migration completed successfully.");
  } catch (error) {
    console.error("\nServices migration failed:", error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected.");
    }
  }
}

runMigration();