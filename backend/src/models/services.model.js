
import mongoose from "mongoose";

// Hero Stats Schema
const serviceStatSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

// Service Cards Schema
const serviceCardSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "/contact",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

// Reusable Feature Schema
const serviceFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

// How It Works Process Steps Schema
const processStepSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: "",
    },
    eyebrow: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

// Main Services Page Schema
const servicesSchema = new mongoose.Schema(
  {
    // Services Hero Section
    hero: {
      eyebrow: {
        type: String,
        default: "Our Services",
      },
      heading: {
        type: String,
        default: "Professional Photography Services",
      },
      subtitle: {
        type: String,
        default: "For Every Special Moment",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
      backgroundImageAlt: {
        type: String,
        default: "",
      },
      buttons: [
        {
          label: {
            type: String,
            default: "",
          },
          href: {
            type: String,
            default: "",
          },
          order: {
            type: Number,
            default: 0,
          },
        },
      ],
      stats: [serviceStatSchema],
    },

    // Services List Section
    services: {
      eyebrow: {
        type: String,
        default: "What We Do",
      },
      heading: {
        type: String,
        default: "Explore Our Services",
      },
      description: {
        type: String,
        default: "",
      },
      secondaryDescription: {
        type: String,
        default: "",
      },
      closingText: {
        type: String,
        default: "",
      },
      ctaLabel: {
        type: String,
        default: "Discuss Your Project",
      },
      ctaHref: {
        type: String,
        default: "/contact",
      },
      items: [serviceCardSchema],
    },

    // Why Choose Us Section
    whyChooseUs: {
      eyebrow: {
        type: String,
        default: "Why Choose Us",
      },
      heading: {
        type: String,
        default: "More Than Just Photography",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
      backgroundImageAlt: {
        type: String,
        default: "",
      },
      ctaLabel: {
        type: String,
        default: "Book a Session",
      },
      ctaHref: {
        type: String,
        default: "/contact",
      },
      features: [serviceFeatureSchema],
    },

    // How It Works Section
    howItWorks: {
      eyebrow: {
        type: String,
        default: "A Thoughtful Process",
      },
      heading: {
        type: String,
        default: "From Your Vision to Forever.",
      },
      description: {
        type: String,
        default: "",
      },
      closingHeading: {
        type: String,
        default: "Every detail tells a story.",
      },
      closingDescription: {
        type: String,
        default: "",
      },
      steps: [processStepSchema],
    },

    // Contact CTA Section
    contactCTA: {
      eyebrow: {
        type: String,
        default: "Let's Create Together",
      },
      heading: {
        type: String,
        default: "Let's Create Something Beautiful Together",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
      backgroundImageAlt: {
        type: String,
        default: "",
      },
      buttonLabel: {
        type: String,
        default: "Contact Us",
      },
      buttonHref: {
        type: String,
        default: "/contact",
      },
      features: [serviceFeatureSchema],
    },

    // Admin Reference
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

const Services = mongoose.model("Services", servicesSchema);

export default Services;
