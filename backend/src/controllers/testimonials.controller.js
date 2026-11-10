
import TestimonialsPage from "../models/testimonials.model.js";

// GET Testimonials page content
export const getTestimonials = async (req, res) => {
  try {
    let testimonials = await TestimonialsPage.findOne();

    // Create initial document if none exists
    if (!testimonials) {
      testimonials = await TestimonialsPage.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Testimonials content fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Get Testimonials Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials content",
    });
  }
};


// UPDATE Testimonials page content
export const updateTestimonials = async (req, res) => {
  try {
    const { hero, reviewsSection, finalCTA } = req.body;

    const allowedSections = {
      hero,
      reviewsSection,
      finalCTA,
    };

    const updates = {};

    for (const [section, value] of Object.entries(allowedSections)) {
      if (value !== undefined) {
        if (
          value === null ||
          typeof value !== "object" ||
          Array.isArray(value)
        ) {
          return res.status(400).json({
            success: false,
            message: `Invalid data for section: ${section}`,
          });
        }

        updates[section] = value;
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one valid testimonials section",
      });
    }

    const testimonials = await TestimonialsPage.findOneAndUpdate(
      {},
      {
        $set: {
          ...updates,
          updatedBy: req.admin?._id ?? null,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Testimonials content updated successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Update Testimonials Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonials content",
    });
  }
};

// UPDATE Testimonials page content
// UPDATE Testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "name",
      "service",
      "review",
      "rating",
      "order",
      "isActive",
    ];

    const testimonials = await TestimonialsPage.findOne();

    if (!testimonials) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page not found",
      });
    }

    const testimonial = testimonials.reviewsSection.testimonials.id(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        testimonial[field] = req.body[field];
      }
    }

    await testimonials.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
    });
  }
};



// ADD Testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, service, review, rating, order, isActive } = req.body;

    if (!name?.trim() || !review?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and review are required",
      });
    }

    let testimonials = await TestimonialsPage.findOne();

    if (!testimonials) {
      testimonials = await TestimonialsPage.create({});
    }

    testimonials.reviewsSection.testimonials.push({
      name,
      service,
      review,
      rating,
      order,
      isActive,
    });

    await testimonials.save();

    return res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Add Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add testimonial",
    });
  }
};


// DELETE Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonials = await TestimonialsPage.findOne();

    if (!testimonials) {
      return res.status(404).json({
        success: false,
        message: "Testimonials page not found",
      });
    }

    const testimonial = testimonials.reviewsSection.testimonials.id(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.deleteOne();

    await testimonials.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete Testimonial Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};