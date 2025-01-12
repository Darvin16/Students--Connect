import mongoose from "mongoose";
const studentsDataSchema = new mongoose.Schema({
  studentId: String,
  studentImage: String,
  name: String,
  email: String,
  phone: Number,
  address: String,
  department: String,
  branchName: String,
  blockName: String,
  roomNumber: String,
  gender: String,
  password: String,
  createdOn: Number,
  academicYear: { type: Number, default: 0 },
});

const studentsData = mongoose.model("studentsData", studentsDataSchema);
export default studentsData;
