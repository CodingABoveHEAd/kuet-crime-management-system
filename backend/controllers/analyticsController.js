import Complaint from "../models/Complaint.js";

// GET /api/analytics/complaints
export const getComplaintStats = async (req, res) => {
  try {
    // Complaints grouped by category
    const categoryStats = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Complaints grouped by status
    const statusStats = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Complaints over time (monthly)
    const monthlyStats = await Complaint.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      categoryStats,
      statusStats,
      monthlyStats,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};
