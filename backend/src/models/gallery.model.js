
import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "",
    },
    href: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);


const signatureHighlightSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      enum: ["camera", "layers", "play", "heart"],
      default: "camera",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle: {
      type: String,
      trim: true,
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

const signatureButtonSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "",
    },
    href: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const signatureFeatureSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    eyebrow: {
      type: String,
      trim: true,
      default: "Our Signature Gallery",
    },
    heading: {
      type: String,
      trim: true,
      default: "Captured Stories,",
    },
    highlightedText: {
      type: String,
      trim: true,
      default: "Timeless Emotions",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    backgroundImage: {
      type: String,
      trim: true,
      default: "/images/gallery/gallery-signature-bg.png",
    },
    backgroundImageAlt: {
      type: String,
      trim: true,
      default: "A cinematic collage of wedding, portrait and celebration photography",
    },
    highlights: {
      type: [signatureHighlightSchema],
      default: [
        { icon: "camera", title: "Premium", subtitle: "Photography", order: 1 },
        { icon: "layers", title: "Curated", subtitle: "Collections", order: 2 },
        { icon: "play", title: "Cinematic", subtitle: "Albums", order: 3 },
        { icon: "heart", title: "Real", subtitle: "Emotions", order: 4 },
      ],
    },
    exploreButton: {
      type: signatureButtonSchema,
      default: () => ({
        label: "Explore the Gallery",
        href: "#gallery-collections",
        isActive: true,
      }),
    },
    reelButton: {
      type: signatureButtonSchema,
      default: () => ({
        label: "Watch Showcase Reel",
        href: "",
        isActive: false,
      }),
    },
  },
  { _id: false }
);

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    alt: {
      type: String,
      trim: true,
      default: "",
    },
    size: {
      type: String,
      trim: true,
      default: "md:col-span-1",
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
  { timestamps: true }
);

const gallerySchema = new mongoose.Schema(
  {
    // 1. Gallery Hero Section
    hero: {
      eyebrow: {
        type: String,
        default: "Our Gallery",
      },
      heading: {
        type: String,
        default: "Stories Through Our Lens",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "/images/Golden Wedding Photo Memories.png",
      },
      backgroundImageAlt: {
        type: String,
        default: "Professional camera and printed photography memories",
      },
      buttons: {
        type: [buttonSchema],
        default: [],
      },
      decorativeCaption: {
        type: [String],
        default: ["Moments", "Emotions", "People", "Stories"],
      },
    },

    // 2. Gallery Collections Section
    collections: {
      eyebrow: {
        type: String,
        default: "The Portfolio",
      },
      heading: {
        type: String,
        default: "Every Frame Tells a Story.",
      },
      description: {
        type: String,
        default: "",
      },
      categories: {
        type: [String],
        default: [],
      },
      photos: {
        type: [photoSchema],
        default: [],
      },
      bottomNote: {
        type: String,
        default: "Capturing moments. Preserving memories. Telling stories.",
      },
      ctaLabel: {
        type: String,
        default: "Plan Your Photoshoot",
      },
      ctaHref: {
        type: String,
        default: "/contact",
      },
    },

    // 3. Testimonial Feature Section
    testimonialFeature: {
      backgroundImage: {
        type: String,
        default: "/images/testimonial-feature.png",
      },
      backgroundImageAlt: {
        type: String,
        default:
          "Wedding photography testimonial with romantic couple and wedding photographs",
      },
      quote: {
        type: String,
        default: "",
      },
      highlightedText: {
        type: String,
        default: "lifetime.",
      },
      attribution: {
        type: String,
        default: "A Happy Client",
      },
    },

    // 4. Wedding Gallery Feature Section
    weddingFeature: {
      backgroundImage: {
        type: String,
        default: "/images/wedding-gallery-feature.png",
      },
      backgroundImageAlt: {
        type: String,
        default:
          "Wedding photography gallery with elegant framed wedding photographs",
      },
      eyebrow: {
        type: String,
        default: "Wedding Album",
      },
      heading: {
        type: String,
        default: "A Glimpse Into Our Wedding Stories",
      },
      description: {
        type: String,
        default: "",
      },
      buttonLabel: {
        type: String,
        default: "View Our Wedding Gallery",
      },
      buttonHref: {
        type: String,
        default: "/gallery?category=weddings",
      },
      supportingText: {
        type: String,
        default: "Every frame tells a story",
      },
      supportingCaption: {
        type: String,
        default: "LOVE · EMOTION · MEMORIES",
      },
    },

    // 5. Gallery Signature Feature Section
      signatureFeature: {
        type: signatureFeatureSchema,
        default: () => ({}),
      },

    // 5. Final CTA Section
    finalCTA: {
      backgroundImage: {
        type: String,
        default: "/images/final-cta-bg.png",
      },
      backgroundImageAlt: {
        type: String,
        default:
          "Elegant photography setup with wedding photographs and camera",
      },
      eyebrow: {
        type: String,
        default: "Let’s Create Together",
      },
      heading: {
        type: String,
        default: "Turn Your Moments into Timeless Memories",
      },
      description: {
        type: String,
        default: "",
      },
      buttonLabel: {
        type: String,
        default: "Book a Session",
      },
      buttonHref: {
        type: String,
        default: "/contact",
      },
    },

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

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model("Gallery", gallerySchema);

export default Gallery;
