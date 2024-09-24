import mongoose from "mongoose";

const staffDataSchema = new mongoose.Schema({
  employeeId: String,
  staffImage: String,
  name: String,
  email: String,
  phone: Number,
  role: String,
  blockName: String,
  gender: String,
  password: String,
  createdOn:Number,
});

const staffData = mongoose.model("staffdata", staffDataSchema);

export default staffData;
