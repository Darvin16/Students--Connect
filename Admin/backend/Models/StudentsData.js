import mongoose from "mongoose";

const studentsDataSchema = new mongoose.Schema({
  studentId: String,
  studentImage: String,
  name: String,
  email: String,
  phone: Number,
  department: String,
  branchName: String,
  blockname: String,
  roomNumber: String,
  gender: String,
  password: String,
  createdOn: Number,
  academicYear: { type: Number, default: 0 },
});

const studentsData = mongoose.model("studentsData", studentsDataSchema);

export default studentsData;
