
import mongoose from "mongoose";

// Individual testimonial schema
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    service: {
      type: String,
      trim: true,
      default: "",
    },
    review: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
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

// Testimonials page schema
const testimonialsPageSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: {
        type: String,
        default: "Real Stories",
      },
      heading: {
        type: String,
        default: "Client Testimonials",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "/images/testimonials-hero.png",
      },
      backgroundImageAlt: {
        type: String,
        default: "Romantic wedding photography at golden hour",
      },
    },

    reviewsSection: {
      backgroundImage: {
        type: String,
        default: "/images/testimonials-bg.png",
      },
      eyebrow: {
        type: String,
        default: "What Our Clients Say",
      },
      heading: {
        type: String,
        default: "Words That Mean the Most",
      },
      description: {
        type: String,
        default:
          "Every message reminds us why we do what we love. Here are some heartfelt words from our clients.",
      },
      testimonials: {
        type: [testimonialSchema],
        default: [],
      },
    },

    finalCTA: {
      backgroundImage: {
        type: String,
        default: "/images/final-story-cta.png",
      },
      backgroundImageAlt: {
        type: String,
        default: "Photography memories and a collection of beautiful moments",
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
  { timestamps: true }
);

const TestimonialsPage =
  mongoose.models.TestimonialsPage ||
  mongoose.model("TestimonialsPage", testimonialsPageSchema);

export default TestimonialsPage;
