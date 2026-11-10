
import dotenv from "dotenv";
import mongoose from "mongoose";
import Homepage from "../src/models/homepage.model.js";

dotenv.config();

/*
  SAFE HOMEPAGE DEFAULTS MIGRATION

  - Fills missing/empty text fields only.
  - Preserves existing populated values.
  - Adds missing array items without deleting existing items.
  - Fills missing fields inside matching array items.
  - Does not create duplicate default items when rerun.
  - Safe to run multiple times.
*/

const defaults = {
  // 1. HERO BANNER
  hero: {
    eyebrow: "Naeem Bhojani Photography",
    heading: "Capturing Stories Beyond Time",
    description:
      "Professional photography with a cinematic approach, preserving your most precious moments into timeless stories.",

    slides: [
      {
        image: "/images/hero-wedding.png",
        alt: "Wedding couple captured by Naeem Bhojani Photography",
        order: 1,
      },
      {
        image: "/images/wedding-detail.png",
        alt: "Wedding details",
        order: 2,
      },
      {
        image: "/images/bridal-portrait.png",
        alt: "Bridal portrait",
        order: 3,
      },
      {
        image: "/images/wedding-celebration.png",
        alt: "Wedding celebration",
        order: 4,
      },
    ],

    stats: [
      { value: "8+", label: "YEARS OF EXPERIENCE", order: 1 },
      { value: "250+", label: "WEDDINGS COVERED", order: 2 },
      { value: "1000+", label: "HAPPY CLIENTS", order: 3 },
      { value: "15+", label: "CITIES WORLDWIDE", order: 4 },
    ],

    primaryButtonLabel: "Explore Our Work",
    primaryButtonHref: "/gallery",
    secondaryButtonLabel: "Watch Showreel",
    showreelHref: "/portfolio",
  },

  // 2. SERVICES SECTION
  services: {
    eyebrow: "Our Services",
    heading: "Creating Memories Across Every Occasion",
    description:
      "Every event has a unique story. Explore our photography services and let's capture your special moments with creativity and precision.",
    buttonLabel: "View All Services",
    buttonHref: "/services",

    services: [
      {
        title: "Wedding Photography",
        image: "/images/Golden Hour Indian Wedding Portrait.png",
        alt: "Wedding photography",
        href: "/services/wedding",
        order: 1,
        isActive: true,
      },
      {
        title: "Products Photography",
        image: "/images/Luxe Bella Perfume Still Life.png",
        alt: "Product photography",
        href: "/services/products",
        order: 2,
        isActive: true,
      },
      {
        title: "Birthday Parties",
        image: "/images/Princess Birthday Dessert Celebration.png",
        alt: "Birthday photography",
        href: "/services/birthday",
        order: 3,
        isActive: true,
      },
      {
        title: "Headshots",
        image: "/images/Confident Corporate Portrait with Warm Bokeh.png",
        alt: "Professional headshots",
        href: "/services/headshots",
        order: 4,
        isActive: true,
      },
      {
        title: "Baby Shower",
        image: "/images/Joyful Baby in a Dreamy Pink Celebration.png",
        alt: "Baby shower photography",
        href: "/services/baby-shower",
        order: 5,
        isActive: true,
      },
      {
        title: "Sports Events",
        image: "/images/Vibrant Stadium Crowd Celebration.png",
        alt: "Sports event photography",
        href: "/services/sports",
        order: 6,
        isActive: true,
      },
      {
        title: "Corporate Events",
        image: "/images/Building Stronger Businesses Together.png",
        alt: "Corporate event photography",
        href: "/services/corporate",
        order: 7,
        isActive: true,
      },
    ],
  },

  // 3. FEATURED GALLERY
  featuredGallery: {
    eyebrow: "Featured Gallery",
    heading: "Real People, Real Stories",
    description:
      "Explore our collection of beautiful moments captured across weddings, pre-wedding shoots, celebrations, portraits, corporate events, and more. Every photograph tells a unique story, preserving genuine emotions and unforgettable memories that last a lifetime.",
    buttonLabel: "View Full Gallery",
    buttonHref: "/gallery",
    viewMoreLabel: "View More",

    categories: [
      { label: "Wedding", order: 1, isActive: true },
      { label: "Birthday Parties", order: 2, isActive: true },
      { label: "Headshots", order: 3, isActive: true },
      { label: "Sports", order: 4, isActive: true },
      { label: "Corporate Events", order: 5, isActive: true },
    ],

    items: [
      {
        title: "Wedding Celebration",
        category: "Wedding",
        image: "/images/Festive Wedding Portrait Under Floral Arch.png",
        alt: "Wedding celebration",
        order: 1,
        isActive: true,
        layout: "md:row-span-2",
      },
      {
        title: "Wedding Reception",
        category: "Wedding",
        image: "/images/Golden Hour Indian Wedding Portrait.png",
        alt: "Wedding reception",
        order: 2,
        isActive: true,
      },
      {
        title: "Professional Portrait",
        category: "Headshots",
        image: "/images/Speaker Addressing a Warmly Lit Gathering.png",
        alt: "Professional portrait",
        order: 3,
        isActive: true,
      },
      {
        title: "Sports Photography",
        category: "Sports",
        image: "/images/Cricket Team at SGVP International Hostel.png",
        alt: "Sports photography",
        order: 4,
        isActive: true,
      },
      {
        title: "Wedding Venue",
        category: "Wedding",
        image: "/images/Luxurious Golden-Light Still Life.png",
        alt: "Wedding venue",
        order: 5,
        isActive: true,
      },
      {
        title: "Birthday Portrait",
        category: "Birthday Parties",
        image: "/images/Princess Birthday Dessert Celebration.png",
        alt: "Birthday portrait",
        order: 6,
        isActive: true,
      },
      {
        title: "Corporate Gathering",
        category: "Corporate Events",
        image: "/images/Business Networking at a Vibrant Trade Show.png",
        alt: "Corporate gathering",
        order: 7,
        isActive: true,
      },
      {
        title: "Sports Celebration",
        category: "Sports",
        image: "/images/Cricket Celebration High-Five.png",
        alt: "Sports celebration",
        order: 8,
        isActive: true,
      },
      {
        title: "Corporate Portraits",
        category: "Corporate Events",
        image: "/images/Sehri Party Bouquet Presentation.png",
        alt: "Corporate portraits",
        order: 9,
        isActive: true,
      },
      {
        title: "Business Exhibition",
        category: "Corporate Events",
        image: "/images/Focused Note-Taking in Blue Drapes.png",
        alt: "Business exhibition",
        order: 10,
        isActive: true,
      },
    ],
  },

  // 4. ABOUT SECTION
  about: {
    eyebrow: "About Naeem Bhojani",
    heading: "Turning Moments Into Timeless Memories",
    description:
      "As a photographer, I am a visual storyteller with an unwavering passion for capturing the world through my lens. What began as a childhood passion is now a journey of turning fleeting moments into timeless memories. For the past 6+ years, I have been capturing love, emotions, and stories that last forever.",

    image: "/images/Smiling Event Photographer with Camera Rig.png",
    imageAlt: "Naeem Bhojani, photographer",
    photographerName: "Naeem Bhojani",
    designation: "Founder & Photographer",
    buttonLabel: "Know More About Me",
    buttonHref: "/about",

    features: [
      {
        title: "Creative Vision",
        description: "Unique and artistic approach to every event.",
        icon: "Camera",
        order: 1,
      },
      {
        title: "Attention to Detail",
        description: "Every moment captured with precision.",
        icon: "ScanEye",
        order: 2,
      },
      {
        title: "Professional Team",
        description: "Experienced and dedicated photography experts.",
        icon: "UsersRound",
        order: 3,
      },
      {
        title: "Timeless Memories",
        description: "Images that tell your story forever.",
        icon: "CalendarCheck",
        order: 4,
      },
    ],
  },

  // 5. BEHIND THE LENS
  behindTheLens: {
    eyebrow: "Behind the Lens",
    heading: "More Than Photos, We Create Films",
    description:
      "Relive your special moments through cinematic films that move your story unforgettable.",

    backgroundImage:
      "/images/Cinematic Canon EOS 5D Mark IV on Stone.png",
    statsBackgroundImage:
      "/images/Golden Alpine Sunset Panorama.png",
    buttonLabel: "Watch Showreel",
    buttonHref: "/portfolio",

    services: [
      {
        title: "Weddings",
        image: "/images/Golden Hour Indian Wedding Portrait.png",
        alt: "Wedding photography",
        href: "/services/wedding",
        order: 1,
        isActive: true,
      },
      {
        title: "Corporate Events",
        image: "/images/Business Networking at a Vibrant Trade Show.png",
        alt: "Corporate event photography",
        href: "/services/corporate",
        order: 2,
        isActive: true,
      },
      {
        title: "Birthday Parties",
        image: "/images/Princess Birthday Dessert Celebration.png",
        alt: "Birthday party photography",
        href: "/services/birthday",
        order: 3,
        isActive: true,
      },
      {
        title: "Sports Events",
        image: "/images/Cricket Celebration High-Five.png",
        alt: "Sports event photography",
        href: "/services/sports",
        order: 4,
        isActive: true,
      },
    ],

    stats: [
      {
        value: "1000+",
        label: "Events Covered",
        icon: "Camera",
        order: 1,
      },
      {
        value: "500+",
        label: "Happy Clients",
        icon: "UsersRound",
        order: 2,
      },
      {
        value: "6+",
        label: "Years of Experience",
        icon: "Gem",
        order: 3,
      },
      {
        value: "100%",
        label: "Client Satisfaction",
        icon: "Star",
        order: 4,
      },
    ],
  },

  // 6. TESTIMONIALS
  testimonials: {
    eyebrow: "Client Testimonials",
    heading: "Words From Our Clients",
    description:
      "Real stories from real people who trusted us with their special moments.",

    testimonials: [
      {
        quote:
          "Highly recommended Naeem Bhojani Photography! They made our event memorable with beautiful pictures.",
        name: "Hussain J.",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 1,
        isActive: true,
      },
      {
        quote:
          "Professional, talented, and extremely creative. They captured every important moment perfectly.",
        name: "Anjoli P.",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 2,
        isActive: true,
      },
      {
        quote:
          "Amazing experience! Very professional and delivered stunning results.",
        name: "Rahul S.",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 3,
        isActive: true,
      },
      {
        quote:
          "The photographs beautifully captured the emotions and special moments of our celebration.",
        name: "Arman K.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 4,
        isActive: true,
      },
      {
        quote:
          "Wonderful photography, excellent attention to detail, and a very professional experience.",
        name: "Priya M.",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 5,
        isActive: true,
      },
      {
        quote:
          "Every picture tells a story. We absolutely loved the final photographs and the service.",
        name: "Dev S.",
        image:
          "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&h=160&fit=crop&crop=faces",
        rating: 5,
        order: 6,
        isActive: true,
      },
    ],
  },

  // 7. WEDDING CTA
  weddingCTA: {
    eyebrow: "LET’S CREATE BEAUTIFUL CHAPTERS",
    heading: "Ready to Capture Your Special Moments?",
    description:
      "Get in touch today and let us turn your moments into timeless memories.",

    backgroundImage: "/images/Golden Foreheads, Forever Love.png",
    backgroundImageAlt: "Bride and groom wedding portrait",
    storyTitle: "Your Story",
    storySubtitle: "Through Our Lens",
    showreelHref: "/portfolio",

    primaryButtonLabel: "Book a Session",
    primaryButtonHref: "/contact",
    secondaryButtonLabel: "Contact Me",
    secondaryButtonHref: "/contact",

    thumbnails: [
      {
        image: "/images/Golden Hour Indian Wedding Portrait.png",
        alt: "Wedding couple portrait",
        order: 1,
      },
      {
        image: "/images/wedding-detail.png",
        alt: "Wedding celebration",
        order: 2,
      },
      {
        image: "/images/wedding-celebration.png",
        alt: "Traditional wedding moments",
        order: 3,
      },
      {
        image: "/images/hero-wedding.png",
        alt: "Romantic wedding portrait",
        order: 4,
      },
    ],
  },
};

// Values considered missing or empty
const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "");

// Match array items using their stable identity
const getItemKey = (item) => {
  if (item.label) return `label:${item.label}`;
  if (item.title) return `title:${item.title}`;
  if (item.name) return `name:${item.name}`;
  if (item.image) return `image:${item.image}`;
  if (item.value && item.label) {
    return `value:${item.value}|label:${item.label}`;
  }

  return null;
};

// Convert Mongoose subdocuments into plain objects
const toPlainObject = (item) => {
  if (item && typeof item.toObject === "function") {
    return item.toObject();
  }

  return { ...item };
};

// Fill missing fields without overwriting populated values
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

// Merge arrays while preserving existing items and their values
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

    if (existingIndex === -1) {
      currentItems.push(defaultItem);
      changed = true;
      console.log(`    + Added item: ${defaultKey || "new item"}`);
      continue;
    }

    const { result, changed: itemChanged } = mergeMissingFields(
      currentItems[existingIndex],
      defaultItem
    );

    if (itemChanged) {
      currentItems[existingIndex] = result;
      changed = true;
      console.log(`    + Filled missing fields: ${defaultKey}`);
    }
  }

  return { result: currentItems, changed };
};

async function migrateSection(homepage, sectionName, sectionDefaults) {
  const currentSection = homepage.get(sectionName) || {};
  let updated = false;

  for (const [field, defaultValue] of Object.entries(sectionDefaults)) {
    const currentValue = currentSection[field];

    if (Array.isArray(defaultValue)) {
      const { result, changed } = mergeArray(
        currentValue,
        defaultValue
      );

      if (changed || !Array.isArray(currentValue)) {
        homepage.set(`${sectionName}.${field}`, result);
        updated = true;
      }
    } else if (isEmptyValue(currentValue)) {
      homepage.set(`${sectionName}.${field}`, defaultValue);
      console.log(`  + ${field}: default value added`);
      updated = true;
    }
  }

  if (!updated) {
    console.log(`  - ${sectionName}: already up to date`);
  }

  return updated;
}

async function runMigration() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = new Homepage({});
      console.log("No homepage document found. Creating one.");
    }

    let changed = false;

    for (const [sectionName, sectionDefaults] of Object.entries(defaults)) {
      console.log(`\nMigrating ${sectionName}...`);

      const sectionChanged = await migrateSection(
        homepage,
        sectionName,
        sectionDefaults
      );

      if (sectionChanged) changed = true;
    }

    if (changed || homepage.isNew) {
      await homepage.save();
      console.log("\nHomepage migration saved successfully.");
    } else {
      console.log("\nNo changes required. Existing data preserved.");
    }

    console.log("\nMigration completed successfully.");
  } catch (error) {
    console.error("\nHomepage migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

runMigration();
