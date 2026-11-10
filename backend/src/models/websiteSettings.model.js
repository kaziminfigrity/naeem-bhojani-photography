
import mongoose from "mongoose";

const pageSEOSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },

    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },

    keywords: {
      type: [String],
      default: [],
    },

    ogImage: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const websiteSettingsSchema = new mongoose.Schema(
  {
    // General Website Settings
    siteName: {
      type: String,
      required: true,
      trim: true,
      default: "Naeem Bhojani Photography",
    },

    logo: {
      type: String,
      default: "",
      trim: true,
    },

    favicon: {
      type: String,
      default: "",
      trim: true,
    },

    // Global SEO Settings
    seo: {
      metaTitle: {
        type: String,
        default: "Naeem Bhojani Photography",
        trim: true,
      },

      metaDescription: {
        type: String,
        default:
          "Discover timeless photography by Naeem Bhojani. Capturing weddings, portraits, events, products and life's beautiful stories.",
        trim: true,
      },

      keywords: {
        type: [String],
        default: [],
      },

      ogImage: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // Individual Page SEO Settings
    pageSEO: {
      home: {
        type: pageSEOSchema,
        default: () => ({}),
      },

      about: {
        type: pageSEOSchema,
        default: () => ({}),
      },

      services: {
        type: pageSEOSchema,
        default: () => ({}),
      },

      contact: {
        type: pageSEOSchema,
        default: () => ({}),
      },

      gallery: {
        type: pageSEOSchema,
        default: () => ({}),
      },

      testimonials: {
        type: pageSEOSchema,
        default: () => ({}),
      },
    },

    // Contact Settings
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    // Social Media Settings
    socialLinks: {
      instagram: { type: String, default: "", trim: true },
      facebook: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
    },

    // Header Navigation
    navigation: [
      {
        label: { type: String, required: true, trim: true },
        href: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],

    // Header CTA
    headerCTA: {
      label: {
        type: String,
        default: "Book a Session",
        trim: true,
      },
      href: {
        type: String,
        default: "/contact",
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },

    // Footer Settings
    footer: {
      description: {
        type: String,
        default:
          "Preserving the emotions, the little details and the unforgettable moments that make your story uniquely yours.",
        trim: true,
      },

      tagline: {
        type: String,
        default: "Capturing timeless stories, one frame at a time.",
        trim: true,
      },

      ctaEyebrow: {
        type: String,
        default: "Your story deserves to be captured",
        trim: true,
      },

      ctaHeading: {
        type: String,
        default: "Let's create something timeless.",
        trim: true,
      },

      exploreTitle: {
        type: String,
        default: "Explore",
        trim: true,
      },

      quickLinks: [
        {
          label: { type: String, required: true, trim: true },
          href: { type: String, required: true, trim: true },
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],

      servicesTitle: {
        type: String,
        default: "Our Services",
        trim: true,
      },

      services: [
        {
          label: { type: String, required: true, trim: true },
          href: { type: String, default: "/services", trim: true },
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],

      contactTitle: {
        type: String,
        default: "Get in Touch",
        trim: true,
      },

      phoneLabel: {
        type: String,
        default: "Call Us",
        trim: true,
      },

      emailLabel: {
        type: String,
        default: "Email Us",
        trim: true,
      },

      locationLabel: {
        type: String,
        default: "Studio Location",
        trim: true,
      },

      privacyPolicy: {
        label: {
          type: String,
          default: "Privacy Policy",
          trim: true,
        },
        href: {
          type: String,
          default: "/privacy-policy",
          trim: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },

      terms: {
        label: {
          type: String,
          default: "Terms & Conditions",
          trim: true,
        },
        href: {
          type: String,
          default: "/terms",
          trim: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },

      copyrightText: {
        type: String,
        default: "All rights reserved.",
        trim: true,
      },
    },

    // Last Updated By
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteSettings = mongoose.model(
  "WebsiteSettings",
  websiteSettingsSchema
);

export default WebsiteSettings;
