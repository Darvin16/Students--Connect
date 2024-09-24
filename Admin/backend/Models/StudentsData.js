import mongoose from "mongoose";

const studentsDataSchema = new mongoose.Schema({
  studentId: String,
  studentImage: String,
  name: String,
  email: String,
  phone: Number,
  department: String,
  blockname: String,
  roomNumber: String,
  gender: String,
  password: String,
  createdOn: Number,
  academicYear:Number,
});

const studentsData = mongoose.model("studentsData", studentsDataSchema);

export default studentsData;
