import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { isLoggedin, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", isLoggedin, upload.array("evidence", 5), createComplaint);

router.get("/my", isLoggedin, getMyComplaints);

router.get(
  "/all",
  isLoggedin,
  authorize("authority", "admin"),
  getAllComplaints
);

router.put(
  "/:id/status",
  isLoggedin,
  authorize("authority", "admin"),
  updateComplaintStatus
);

export default router;
