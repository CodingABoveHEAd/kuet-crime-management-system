import express from "express";
import { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus } from "../controllers/complaintController.js";
import { isLoggedin, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a complaint (any logged-in user)
router.post("/", isLoggedin, createComplaint);

// Get logged-in user's complaints
router.get("/my", isLoggedin, getMyComplaints);

// Get all complaints (authority/admin only)
router.get("/all", isLoggedin, authorize("authority", "admin"), getAllComplaints);

// Update complaint status (authority/admin only)
router.put("/:id/status", isLoggedin, authorize("authority", "admin"), updateComplaintStatus);

export default router;
