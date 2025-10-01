import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";
import {sendEmail} from "../utils/sendEmail.js";
import User from "../models/User.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "complaints" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// Create complaint with multiple images
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let evidenceUrls = [];

    if (req.files && req.files.length > 0) {
      evidenceUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description,
      category,
      evidence: evidenceUrls,
    });

    // send email to user after complaint is created
    const user = await User.findById(req.user._id);
    if (user?.email) {
      await sendEmail(
        user.email,
        "Complaint Submitted Successfully",
        `Hello ${user.name},\n\nYour complaint titled "${title}" has been submitted successfully.Our team will review it soon.\n\nThank you \nfrom KUET Crime Management Authority.`
      );
    }

    res
      .status(201)
      .json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints (admin/authority)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update complaint status with email notification
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Under Review", "Resolved"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    // send email notification
    if (complaint.user?.email) {
      await sendEmail(
        complaint.user.email,
        "Complaint Status Updated",
        `Hello ${complaint.user.name},\n\nYour complaint titled "${complaint.title}" has been updated to: ${complaint.status}.\n\nThank you.`
      );
    }

    res.json({ message: "Complaint status updated & email sent", complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
