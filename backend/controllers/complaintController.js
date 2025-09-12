import Complaint from "../models/Complaint.js";

// Create complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, evidence } = req.body;

    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description,
      category,
      evidence,
    });

    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
   // console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Get logged-in user's complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
   // console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get all complaints (admin/authority)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    res.json({ message: "Complaint status updated", complaint });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: error.message });
  }
};
