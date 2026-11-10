
import Services from "../models/services.model.js";

// GET Services Page Content
export const getServicesContent = async (req, res) => {
  try {
    const services = await Services.findOne();

    if (!services) {
      return res.status(404).json({
        success: false,
        message: "Services content not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Services content fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Get services content error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch services content",
    });
  }
};

// UPDATE Services Page Content
export const updateServicesContent = async (req, res) => {
  try {
    const allowedFields = [
      "hero",
      "services",
      "whyChooseUs",
      "howItWorks",
      "contactCTA",
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
        message: "Please provide valid services content to update",
      });
    }

    let services = await Services.findOne();

    if (!services) {
      services = new Services();
    }

    for (const [key, value] of Object.entries(updates)) {
      services.set(key, value);
    }

    services.updatedBy = req.admin._id;

    await services.save();

    return res.status(200).json({
      success: true,
      message: "Services content updated successfully",
      data: services,
    });
  } catch (error) {
    console.error("Update services content error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update services content",
    });
  }
};
