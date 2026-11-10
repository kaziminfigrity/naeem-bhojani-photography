
import mongoose from "mongoose";

const contactPageSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: {
        type: String,
        default: "Get in Touch",
        trim: true,
      },
      heading: {
        type: String,
        default: "Let’s Create Something Beautiful",
        trim: true,
      },
      description: {
        type: String,
        default:
          "We’d love to hear from you. Whether it’s a wedding, a special event, a portrait session, or a creative project — let’s bring your vision to life together.",
        trim: true,
      },
      backgroundImage: {
        type: String,
        default: "/images/contact-hero.png",
        trim: true,
      },
      backgroundImageAlt: {
        type: String,
        default: "Bride and groom in a beautiful wedding setting",
        trim: true,
      },
      supportingText: {
        type: String,
        default: "Every moment deserves to be remembered",
        trim: true,
      },
    },

    contactSection: {
      backgroundImage: {
        type: String,
        default: "/images/contact-section-bg.png",
        trim: true,
      },
      heading: {
        type: String,
        default: "Let’s Talk About Your Special Moments",
        trim: true,
      },
      description: {
        type: String,
        default:
          "Feel free to reach out to us through any of the following channels. We’re always happy to connect and discuss your photography needs.",
        trim: true,
      },
      formHeading: {
        type: String,
        default: "Book a Session",
        trim: true,
      },
      formDescription: {
        type: String,
        default:
          "Fill out the form below and we’ll get back to you as soon as possible.",
        trim: true,
      },
      privacyNote: {
        type: String,
        default:
          "Your details will be used only to respond to your enquiry.",
        trim: true,
      },
      contactItems: [
        {
          title: {
            type: String,
            trim: true,
          },
          detail: {
            type: String,
            trim: true,
          },
          note: {
            type: String,
            trim: true,
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
      ],
      eventTypes: {
        type: [String],
        default: [
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
    },

    locationSection: {
      eyebrow: {
        type: String,
        default: "Our Location",
        trim: true,
      },
      heading: {
        type: String,
        default: "Visit Our Studio",
        trim: true,
      },
      description: {
        type: String,
        default:
          "We’d be happy to welcome you to our studio. Let’s meet, discuss your ideas and plan something extraordinary together.",
        trim: true,
      },
      backgroundImage: {
        type: String,
        default: "/images/contact-location-bg.png",
        trim: true,
      },
      studioName: {
        type: String,
        default: "Naeem Bhojani Photography",
        trim: true,
      },
      address: {
        type: String,
        default: "Ahmedabad, Gujarat, India",
        trim: true,
      },
      mapQuery: {
        type: String,
        default: "Naeem Bhojani Photography, Ahmedabad, Gujarat, India",
        trim: true,
      },
      directionsUrl: {
        type: String,
        default: "",
        trim: true,
      },
      locationNote: {
        type: String,
        default: "Let’s plan your next photography session.",
        trim: true,
      },
      mapCaption: {
        type: String,
        default: "AHMEDABAD, GUJARAT, INDIA",
        trim: true,
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

const ContactPage = mongoose.model("ContactPage", contactPageSchema);

export default ContactPage;
