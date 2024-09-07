import mongoose from "mongoose";

const staffDataSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  email: String,
  phone: String,
  role: String,
  blockName: String,
  gender: String,
});

const staffData = mongoose.model("staffdata", staffDataSchema);

export default staffData;
