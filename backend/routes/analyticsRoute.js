import express from "express";
import { getComplaintStats } from "../controllers/analyticsController.js";
import { isLoggedin, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// endpoint: GET /api/analytics/complaints
router.get("/complaints", isLoggedin, authorize("admin", "authority"), getComplaintStats);

export default router;
