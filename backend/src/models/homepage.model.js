
import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
  {
    // 1. HERO BANNER
    hero: {
      eyebrow: {
        type: String,
        default: "Naeem Bhojani Photography",
      },
      heading: {
        type: String,
        default: "Capturing Stories Beyond Time",
      },
      description: String,

      slides: [
        {
          image: String,
          alt: String,
          order: { type: Number, default: 0 },
        },
      ],

      stats: [
        {
          value: String,
          label: String,
          order: { type: Number, default: 0 },
        },
      ],

      primaryButtonLabel: String,
      primaryButtonHref: String,
      secondaryButtonLabel: String,
      showreelHref: String,
    },

    // 2. SERVICES SECTION
    services: {
      eyebrow: String,
      heading: String,
      description: String,
      buttonLabel: String,
      buttonHref: String,

      services: [
        {
          title: String,
          image: String,
          alt: String,
          href: String,
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    // 3. FEATURED GALLERY
    featuredGallery: {
      eyebrow: String,
      heading: String,
      description: String,
      buttonLabel: String,
      buttonHref: String,
      viewMoreLabel: String,

      categories: [
        {
          label: String,
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],

      items: [
        {
          title: String,
          category: String,
          image: String,
          alt: String,
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
          layout: String,
        },
      ],
    },

    // 4. ABOUT SECTION
    about: {
      eyebrow: {
        type: String,
        default: "About Naeem Bhojani",
      },
      heading: {
        type: String,
        default: "Turning Moments Into Timeless Memories",
      },
      description: String,
      image: String,
      imageAlt: String,
      photographerName: String,
      designation: String,
      buttonLabel: String,
      buttonHref: String,

      features: [
        {
          title: String,
          description: String,
          icon: String,
          order: { type: Number, default: 0 },
        },
      ],
    },

    // 5. BEHIND THE LENS
    behindTheLens: {
      eyebrow: {
        type: String,
        default: "Behind the Lens",
      },
      heading: {
        type: String,
        default: "More Than Photos, We Create Films",
      },
      description: String,
      backgroundImage: String,
      statsBackgroundImage: String,
      buttonLabel: String,
      buttonHref: String,

      services: [
        {
          title: String,
          image: String,
          alt: String,
          href: String,
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],

      stats: [
        {
          value: String,
          label: String,
          icon: String,
          order: { type: Number, default: 0 },
        },
      ],
    },

    // 6. TESTIMONIALS
    testimonials: {
      eyebrow: String,
      heading: String,
      description: String,

      testimonials: [
        {
          name: String,
          quote: String,
          image: String,
          rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
          },
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    // 7. WEDDING CTA
    weddingCTA: {
      eyebrow: {
        type: String,
        default: "LET'S CREATE BEAUTIFUL CHAPTERS",
      },
      heading: {
        type: String,
        default: "Ready to Capture Your Special Moments?",
      },
      description: String,
      backgroundImage: String,
      backgroundImageAlt: String,
      storyTitle: String,
      storySubtitle: String,
      showreelHref: String,
      primaryButtonLabel: String,
      primaryButtonHref: String,
      secondaryButtonLabel: String,
      secondaryButtonHref: String,

      thumbnails: [
        {
          image: String,
          alt: String,
          order: { type: Number, default: 0 },
        },
      ],
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Homepage = mongoose.model("Homepage", homepageSchema);

export default Homepage;
