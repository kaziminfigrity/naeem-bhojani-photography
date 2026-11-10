import Gallery from "../models/gallery.model.js";

// GET Gallery content
export const getGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findOne();

    if (!gallery) {
      gallery = await Gallery.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Gallery content fetched successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Get Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery content",
    });
  }
};

// UPDATE Gallery content
export const updateGallery = async (req, res) => {
  try {
    const {
      hero,
      collections,
      testimonialFeature,
      weddingFeature,
      signatureFeature,
      finalCTA,
    } = req.body;

    const allowedSections = {
      hero,
      collections,
      testimonialFeature,
      weddingFeature,
      signatureFeature,
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
        message: "Please provide at least one valid gallery section",
      });
    }

    const gallery = await Gallery.findOneAndUpdate(
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
      message: "Gallery content updated successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery content",
    });
  }
};