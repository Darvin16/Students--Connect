import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  requestId: String,
  studentId: String,
  studentImage: String,
  studentName: String,
  studentBlockName: String,
  studentRoomNumber: String,
  studentDepartment: String,
  studentBranchName: String,
  studentAcademicYear: Number,
  studentContactNo: Number,
  parentContactNo: Number,
  requestDate: Number,
  reason: String,
  leaveType: String,
  from: Number,
  to: Number,
  oneDayLeave: { type: Boolean, default: false },
  wardenApproval: {
    status: String,
    by: String,
    time: Number,
    wardenName: String,
  },
  SROApproval: {
    status: String,
    by: String,
    time: Number,
    SROName: String,
  },
  cancelRequest: {
    status: { type: Boolean, default: false },
    time: Number,
    reason: String,
  },
});

const leaveRequest = mongoose.model("leave-request", leaveRequestSchema);

export default leaveRequest;
