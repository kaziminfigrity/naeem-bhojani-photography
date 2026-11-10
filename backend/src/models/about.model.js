
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    src: { type: String, default: "" },
    alt: { type: String, default: "" },
    position: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const aboutSchema = new mongoose.Schema(
  {
    hero: {
      backgroundImage: { type: String, default: "" },
      backgroundImageAlt: { type: String, default: "" },
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      headingLine2: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      highlightText2: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonLink: { type: String, default: "" },
      photographyTypes: [
        { type: String },
      ],
    },

    story: {
      images: [imageSchema],
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      headingLine2: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      paragraphs: [{ type: String }],
      signatureText: { type: String, default: "" },
    },

    achievementStats: [
      {
        value: { type: String, default: "" },
        label: { type: String, default: "" },
        icon: { type: String, default: "camera" },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],

    philosophy: {
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonLink: { type: String, default: "" },
      images: [imageSchema],
    },

    expertise: {
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonLink: { type: String, default: "" },
      services: [
        {
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          image: { type: String, default: "" },
          alt: { type: String, default: "" },
          link: { type: String, default: "" },
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    whyChooseUs: {
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      description: { type: String, default: "" },
      features: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          icon: { type: String, default: "star" },
          order: { type: Number, default: 0 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },

    workTogether: {
      backgroundImage: { type: String, default: "" },
      backgroundImageAlt: { type: String, default: "" },
      eyebrow: { type: String, default: "" },
      headingLine1: { type: String, default: "" },
      highlightText: { type: String, default: "" },
      description: { type: String, default: "" },
      primaryButtonText: { type: String, default: "" },
      primaryButtonLink: { type: String, default: "" },
      secondaryButtonText: { type: String, default: "" },
      secondaryButtonLink: { type: String, default: "" },
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
