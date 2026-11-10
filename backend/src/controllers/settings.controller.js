
import WebsiteSettings from "../models/websiteSettings.model.js";

// GET Website Settings
export const getWebsiteSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = await WebsiteSettings.create({
        siteName: "Naeem Bhojani Photography",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Website settings fetched successfully",
      settings,
    });
  } catch (error) {
    console.error("Get website settings error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch website settings",
    });
  }
};

// UPDATE Website Settings
export const updateWebsiteSettings = async (req, res) => {
  try {
    const allowedFields = [
      "siteName",
      "logo",
      "favicon",
      "seo",
      "pageSEO",
      "email",
      "phone",
      "address",
      "socialLinks",
      "navigation",
      "headerCTA",
      "footer",
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
        message: "Please provide at least one setting to update",
      });
    }

    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings({
        siteName: "Naeem Bhojani Photography",
      });
    }

    // Merge Global SEO fields
    if (updates.seo) {
      const existingSEO = settings.seo?.toObject
        ? settings.seo.toObject()
        : settings.seo || {};

      updates.seo = {
        ...existingSEO,
        ...updates.seo,
      };
    }

    // Merge Page-wise SEO fields
    if (updates.pageSEO) {
      const existingPageSEO = settings.pageSEO?.toObject
        ? settings.pageSEO.toObject()
        : settings.pageSEO || {};

      const mergedPageSEO = { ...existingPageSEO };

      const allowedPages = [
        "home",
        "about",
        "services",
        "contact",
        "gallery",
        "testimonials",
      ];

      for (const page of allowedPages) {
        if (updates.pageSEO[page] !== undefined) {
          const existingPage = existingPageSEO[page]?.toObject
            ? existingPageSEO[page].toObject()
            : existingPageSEO[page] || {};

          mergedPageSEO[page] = {
            ...existingPage,
            ...updates.pageSEO[page],
          };
        }
      }

      updates.pageSEO = mergedPageSEO;
    }

    // Apply updates
    Object.assign(settings, updates);

    // Track admin who updated settings
    if (req.admin?._id) {
      settings.updatedBy = req.admin._id;
    }

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Website settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update website settings error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update website settings",
    });
  }
};
