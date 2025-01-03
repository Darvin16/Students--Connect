import mongoose from "mongoose";

const latePermissionSchema = new mongoose.Schema({
  studentId: String,
  studentImage: String,
  studentName: String,
  studentBlockName: String,
  studentRoomNumber: String,
  studentDepartment: String,
  studentAcademicYear: Number,
  studentContactNo: Number,
  reason: String,
  date: Number,
  outTime: String,
  inTime: String,
  status: {
    status: { type: String, default: "pending" },
    by: String,
    id: String,
    name: String,
    time: Number,
  },
});

const LatePermissions = mongoose.model("late-permissions", latePermissionSchema);

export default LatePermissions;
