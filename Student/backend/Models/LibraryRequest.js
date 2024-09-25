import mongoose from "mongoose";

const libraryRequestSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  studentBlockName: String,
  studentRoomNumber: String,
  studentDepartment: String,
  studentBranchName: String,
  studentAcademicYear: Number,
  studentContactNo: Number,
  requestDate: Number,
  description: String,
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
  in: {
    time: Number,
    by: String,
    librarianName: String,
  },
  out: {
    time: Number,
    by: String,
    librarianName: String,
  },
  delayTime: Number,
  cancelRequest: {
    status: { type: Boolean, default: false },
    time: Number,
    reason: String,
  },
});

const libraryRequest = mongoose.model("library-request", libraryRequestSchema);

export default libraryRequest;
