
import Homepage from "../models/homepage.model.js";

// GET Homepage Content
export const getHomepageContent = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Homepage content fetched successfully",
      data: homepage,
    });
  } catch (error) {
    console.error("Get homepage content error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch homepage content",
    });
  }
};

// UPDATE Homepage Content
export const updateHomepageContent = async (req, res) => {
  try {
    const allowedFields = [
      "hero",
      "services",
      "featuredGallery",
      "about",
      "behindTheLens",
      "testimonials",
      "weddingCTA",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid homepage content to update",
      });
    }

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = new Homepage();
    }

    for (const [key, value] of Object.entries(updates)) {
      homepage.set(key, value);
    }

    homepage.updatedBy = req.admin._id;

    await homepage.save();

    return res.status(200).json({
      success: true,
      message: "Homepage content updated successfully",
      data: homepage,
    });
  } catch (error) {
    console.error("Update homepage content error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update homepage content",
    });
  }
};
