
import dotenv from "dotenv";
import mongoose from "mongoose";
import About from "../src/models/about.model.js";

dotenv.config();

/*
  SAFE ABOUT PAGE DEFAULTS MIGRATION

  - Fills missing/empty text fields only.
  - Preserves existing populated values.
  - Adds missing array items without deleting existing items.
  - Fills missing fields inside matching array items.
  - Avoids duplicate default items when rerun.
  - Safe to run multiple times.
*/

// ==========================================
// 1. ABOUT PAGE DEFAULT DATA
// ==========================================

const aboutSeedData = {
  // 1. HERO SECTION
  hero: {
    backgroundImage:
      "/images/Golden-Lit Event Photographer at Work.png",
    backgroundImageAlt: "Photographer capturing beautiful moments",
    eyebrow: "ABOUT NAEEM BHOJANI",
    headingLine1: "Capturing",
    headingLine2: "Moments,",
    highlightText: "Creating",
    highlightText2: "Memories",
    description:
      "Every photograph tells a story. We capture genuine emotions, beautiful celebrations and timeless memories through our passion for photography.",
    buttonText: "Discover Our Story",
    buttonLink: "#our-story",
    photographyTypes: [
      "Wedding Photography",
      "Pre-Wedding Photography",
      "Events",
      "Portraits",
      "Product Photography",
    ],
  },

  // 2. OUR STORY
  story: {
    images: [
      {
        src: "/images/Smiling Event Photographer with Camera Rig.png",
        alt: "Naeem Bhojani working with his camera",
        position:
          "left-[2%] top-[5%] z-10 h-[88%] w-[57%] -rotate-2",
        order: 1,
      },
      {
        src: "/images/Golden Bokeh Indian Wedding Portrait.png",
        alt: "Wedding couple photography",
        position:
          "left-[53%] top-[7%] z-20 h-[53%] w-[39%] rotate-2",
        order: 2,
      },
      {
        src: "/images/Whimsical Garden Baby Portrait.png",
        alt: "Baby portrait photography",
        position:
          "left-[43%] top-[51%] z-30 h-[39%] w-[30%] -rotate-3",
        order: 3,
      },
      {
        src: "/images/Luxury Chronograph on Golden Stone.png",
        alt: "Luxury product photography",
        position:
          "left-[68%] top-[54%] z-20 h-[38%] w-[29%] rotate-2",
        order: 4,
      },
    ],

    eyebrow: "Our Story",
    headingLine1: "A Journey",
    headingLine2: "Driven by",
    highlightText: "Passion",

    paragraphs: [
      "Photography has always been more than just a profession for me — it's a passion, a way to see the world, and a way to tell stories. What started as a love for capturing moments slowly turned into a full-time journey, allowing me to be part of people's most important milestones.",

      "Over the years, I have had the privilege of working with wonderful clients, witnessing beautiful stories, and creating memories that last a lifetime. Every click is driven by a deep passion for detail, a love for real emotions, and a commitment to deliver timeless images.",
    ],

    signatureText: "Every frame tells a story",
  },

  // 3. ACHIEVEMENT STATS
  achievementStats: [
    {
      value: "500+",
      label: "Projects Completed",
      icon: "camera",
      order: 1,
      isActive: true,
    },
    {
      value: "300+",
      label: "Happy Clients",
      icon: "users-round",
      order: 2,
      isActive: true,
    },
    {
      value: "10+",
      label: "Years of Experience",
      icon: "trophy",
      order: 3,
      isActive: true,
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      icon: "heart",
      order: 4,
      isActive: true,
    },
  ],

  // 4. OUR PHILOSOPHY
  philosophy: {
    eyebrow: "Our Philosophy",
    headingLine1: "Real People",
    highlightText: "Real Moments",

    description:
      "We believe in capturing genuine emotions, real connections, and the true essence of every moment. Whether it's a wedding, a birthday, a corporate event or a simple portrait, our approach remains the same — authentic, creative and timeless.",

    buttonText: "Our Philosophy",
    buttonLink: "/services",

    images: [
      {
        src: "/images/philosophy-wedding.png",
        alt: "Wedding details and genuine emotions",
        position:
          "left-[3%] top-[5%] z-10 h-[48%] w-[34%] -rotate-6",
        order: 1,
      },
      {
        src: "/images/philosophy-couple.png",
        alt: "Couple sharing a beautiful sunset moment",
        position:
          "left-[34%] top-[5%] z-20 h-[59%] w-[34%] rotate-2",
        order: 2,
      },
      {
        src: "/images/philosophy-baby.png",
        alt: "Baby portrait photography",
        position:
          "right-[2%] top-[7%] z-10 h-[47%] w-[29%] rotate-[-4deg]",
        order: 3,
      },
      {
        src: "/images/philosophy-coffee.png",
        alt: "Warm lifestyle and detail photography",
        position:
          "left-[10%] bottom-[7%] z-30 h-[35%] w-[34%] rotate-3",
        order: 4,
      },
      {
        src: "/images/philosophy-detail.png",
        alt: "Creative detail photography",
        position:
          "left-[42%] bottom-[3%] z-20 h-[32%] w-[23%] -rotate-3",
        order: 5,
      },
      {
        src: "/images/philosophy-event.png",
        alt: "Corporate event photography",
        position:
          "right-[1%] bottom-[7%] z-30 h-[38%] w-[35%] rotate-2",
        order: 6,
      },
    ],
  },

  // 5. OUR EXPERTISE
  expertise: {
    eyebrow: "Our Expertise",
    headingLine1: "More Than",
    highlightText: "Just Weddings",

    description:
      "From weddings to corporate events, from birthday celebrations to product shoots, we cover a wide range of photography services. Each category brings a new story, a new set of emotions, and a new creative challenge — and that's what makes our journey exciting.",

    buttonText: "Explore Our Services",
    buttonLink: "/services",

    services: [
      {
        title: "Wedding",
        subtitle: "Photography",
        image: "/images/service-wedding.png",
        alt: "Elegant wedding couple photography",
        link: "/services",
        order: 1,
        isActive: true,
      },
      {
        title: "Pre-Wedding",
        subtitle: "Photography",
        image: "/images/service-prewedding.png",
        alt: "Romantic pre-wedding couple photography",
        link: "/services",
        order: 2,
        isActive: true,
      },
      {
        title: "Birthday",
        subtitle: "Photography",
        image: "/images/service-birthday.png",
        alt: "Birthday celebration photography",
        link: "/services",
        order: 3,
        isActive: true,
      },
      {
        title: "Maternity",
        subtitle: "Photography",
        image: "/images/service-maternity.png",
        alt: "Maternity portrait photography",
        link: "/services",
        order: 4,
        isActive: true,
      },
      {
        title: "Family Shoot",
        subtitle: "",
        image: "/images/service-family.png",
        alt: "Family portrait photography",
        link: "/services",
        order: 5,
        isActive: true,
      },
      {
        title: "Product",
        subtitle: "Photography",
        image: "/images/service-product.png",
        alt: "Premium product photography",
        link: "/services",
        order: 6,
        isActive: true,
      },
      {
        title: "Corporate",
        subtitle: "Events",
        image: "/images/service-corporate.png",
        alt: "Corporate event photography",
        link: "/services",
        order: 7,
        isActive: true,
      },
      {
        title: "Sports",
        subtitle: "Photography",
        image: "/images/service-sports.png",
        alt: "Sports action photography",
        link: "/services",
        order: 8,
        isActive: true,
      },
    ],
  },

  // 6. WHY CHOOSE US
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    headingLine1: "Turning Moments",
    highlightText: "Into Memories",

    description:
      "We focus on quality, creativity and a personal approach to make your experience comfortable and memorable. Our goal is not just to take photos, but to create stories that you will cherish forever.",

    features: [
      {
        title: "Professional Approach",
        description:
          "High-quality photography with attention to detail",
        icon: "camera",
        order: 1,
        isActive: true,
      },
      {
        title: "Personal Connection",
        description:
          "We take time to understand your story",
        icon: "users-round",
        order: 2,
        isActive: true,
      },
      {
        title: "Creative Vision",
        description:
          "Unique and artistic style for every event",
        icon: "star",
        order: 3,
        isActive: true,
      },
      {
        title: "Timeless Memories",
        description:
          "Images that last a lifetime",
        icon: "heart",
        order: 4,
        isActive: true,
      },
    ],
  },

  // 7. WORK TOGETHER
  workTogether: {
    backgroundImage: "/images/work-together-bg.png",
    backgroundImageAlt:
      "Photographer capturing a beautiful sunset landscape",

    eyebrow: "Let's Create Something Beautiful",
    headingLine1: "Let's Work",
    highlightText: "Together",

    description:
      "Looking for a photographer who understands your story? Let's create timeless memories together.",

    primaryButtonText: "Book a Session",
    primaryButtonLink: "/contact",

    secondaryButtonText: "Watch Our Work",
    secondaryButtonLink: "/gallery",
  },
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// Check missing or empty values
const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "");

// Get unique identity of array items
const getItemKey = (item) => {
  if (item === undefined || item === null) return null;

  if (typeof item !== "object") {
    return `value:${item}`;
  }

  if (item.src) return `src:${item.src}`;
  if (item.image) return `image:${item.image}`;
  if (item.label) return `label:${item.label}`;
  if (item.title) return `title:${item.title}`;
  if (item.name) return `name:${item.name}`;

  return null;
};

// Convert Mongoose subdocuments into plain objects
const toPlainObject = (item) => {
  if (item && typeof item.toObject === "function") {
    return item.toObject();
  }

  return item;
};

// Fill missing fields without overwriting existing values
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

// Merge arrays while preserving existing items
const mergeArray = (currentArray, defaultArray) => {
  const currentItems = Array.isArray(currentArray)
    ? currentArray.map(toPlainObject)
    : [];

  let changed = false;

  for (const defaultItem of defaultArray) {
    const defaultKey = getItemKey(defaultItem);

    const existingIndex = currentItems.findIndex((item) => {
      const currentKey = getItemKey(item);

      return defaultKey && currentKey === defaultKey;
    });

    // Add missing item
    if (existingIndex === -1) {
      currentItems.push(defaultItem);
      changed = true;

      console.log(
        `    + Added item: ${defaultKey || "new item"}`
      );

      continue;
    }

    // Fill missing fields in existing object items
    const existingItem = currentItems[existingIndex];

    if (
      defaultItem &&
      typeof defaultItem === "object" &&
      existingItem &&
      typeof existingItem === "object"
    ) {
      const { result, changed: itemChanged } =
        mergeMissingFields(existingItem, defaultItem);

      if (itemChanged) {
        currentItems[existingIndex] = result;
        changed = true;

        console.log(
          `    + Filled missing fields: ${defaultKey}`
        );
      }
    }
  }

  return { result: currentItems, changed };
};

// ==========================================
// 3. MIGRATE INDIVIDUAL ABOUT SECTIONS
// ==========================================

const migrateSection = (about, sectionName, sectionDefaults) => {
  const currentSection = about.get(sectionName) || {};

  let updated = false;

  for (const [field, defaultValue] of Object.entries(sectionDefaults)) {
    const currentValue = currentSection[field];

    if (Array.isArray(defaultValue)) {
      const { result, changed } = mergeArray(
        currentValue,
        defaultValue
      );

      if (changed || !Array.isArray(currentValue)) {
        about.set(`${sectionName}.${field}`, result);
        updated = true;
      }
    } else if (isEmptyValue(currentValue)) {
      about.set(`${sectionName}.${field}`, defaultValue);

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
// 4. RUN ABOUT PAGE MIGRATION
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

    let about = await About.findOne();

    if (!about) {
      about = new About({});

      console.log("No About document found. Creating one.");
    }

    let changed = false;

    // Migrate all About Page sections
    for (const [sectionName, sectionDefaults] of Object.entries(
      aboutSeedData
    )) {
      console.log(`\nMigrating ${sectionName}...`);

      const sectionChanged = migrateSection(
        about,
        sectionName,
        sectionDefaults
      );

      if (sectionChanged) {
        changed = true;
      }
    }

    // Save only when changes are found
    if (changed || about.isNew) {
      await about.save();

      console.log("\nAbout migration saved successfully.");
    } else {
      console.log(
        "\nNo changes required. Existing data preserved."
      );
    }

    console.log("\nAbout migration completed successfully.");
  } catch (error) {
    console.error("\nAbout migration failed:", error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected.");
    }
  }
}

runMigration();
