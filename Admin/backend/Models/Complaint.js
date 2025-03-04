import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  requestId: String,
  studentId: String,
  studentName: String,
  studentEmail: String,
  studentBlockName: String,
  studentRoomNumber: String,
  issue: String,
  description: String,
  image: String,
  requestDate: Number,
  status: {
    status: { type: String, default: "pending" },
    by: String,
    id: String,
    name: String,
    time: Number,
  },
});

const complaint = mongoose.model("complaint", complaintSchema);

export default complaint;
