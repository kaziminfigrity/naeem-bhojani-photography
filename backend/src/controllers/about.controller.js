
import About from "../models/about.model.js";

// GET ABOUT PAGE DATA
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    // Create default document if it does not exist
    if (!about) {
      about = await About.create({});
    }

    return res.status(200).json({
      success: true,
      message: "About page data fetched successfully",
      data: about,
    });
  } catch (error) {
    console.error("Get About Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch About page data",
      error: error.message,
    });
  }
};

// UPDATE ABOUT PAGE DATA
export const updateAbout = async (req, res) => {
  try {
    const { updatedBy, ...aboutData } = req.body;

    const about = await About.findOneAndUpdate(
      {},
      { $set: aboutData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "About page updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Update About Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update About page",
      error: error.message,
    });
  }
};
