import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Other" },
    status: { type: String, enum: ["Pending", "Under Review", "Resolved"], default: "Pending" },
    //evidence: { type: String }, // URL or path to uploaded file
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
