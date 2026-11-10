
import ContactPage from "../models/contact.model.js";

// GET Contact Page
export const getContactPage = async (req, res) => {
  try {
    let contactPage = await ContactPage.findOne();

    if (!contactPage) {
      contactPage = await ContactPage.create({});
    }

    return res.status(200).json({
      success: true,
      message: "Contact page fetched successfully",
      data: contactPage,
    });
  } catch (error) {
    console.error("Get Contact Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact page",
    });
  }
};

// UPDATE Contact Page
export const updateContactPage = async (req, res) => {
  try {
    const updatedBy = req.admin?._id ?? null;

    let contactPage = await ContactPage.findOne();

    if (!contactPage) {
      contactPage = new ContactPage(req.body);
    } else {
      contactPage.set(req.body);
    }

    contactPage.updatedBy = updatedBy;

    await contactPage.save();

    return res.status(200).json({
      success: true,
      message: "Contact page updated successfully",
      data: contactPage,
    });
  } catch (error) {
    console.error("Update Contact Page Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact page",
    });
  }
};
