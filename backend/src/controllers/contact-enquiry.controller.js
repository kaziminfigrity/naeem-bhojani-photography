
import ContactEnquiry from "../models/contact-enquiry.model.js";

// CREATE Contact Enquiry
export const createContactEnquiry = async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, message } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !eventType?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email, event type, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create enquiry
    const enquiry = await ContactEnquiry.create({
      name,
      email,
      phone,
      eventType,
      eventDate: eventDate || null,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully",
      data: {
        id: enquiry._id,
        name: enquiry.name,
        status: enquiry.status,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Create Contact Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit your enquiry",
    });
  }
};




// GET All Contact Enquiries (Admin Only)
export const getAllContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Contact enquiries fetched successfully",
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get Contact Enquiries Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact enquiries",
    });
  }
};





// GET Single Contact Enquiry (Admin Only)
export const getSingleContactEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await ContactEnquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact enquiry fetched successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Get Single Contact Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact enquiry",
    });
  }
};







// UPDATE Contact Enquiry (Admin Only)
export const updateContactEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "in-progress",
      "completed",
      "cancelled",
    ];

    if (status === undefined && adminNote === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide status or admin note",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status",
      });
    }

    if (adminNote !== undefined && typeof adminNote !== "string") {
      return res.status(400).json({
        success: false,
        message: "Admin note must be a string",
      });
    }

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (adminNote !== undefined) {
      updateData.adminNote = adminNote.trim();
    }

    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Update Contact Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact enquiry",
    });
  }
};








// DELETE Contact Enquiry (Admin Only)
export const deleteContactEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await ContactEnquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contact enquiry",
    });
  }
};
