import mongoose from "mongoose";

const AdminDataSchema = new mongoose.Schema({
  admin_email: String,
  role: { type: String, default: "admin" },
  password: String,
});

const adminData = mongoose.model("adminData", AdminDataSchema);

export default adminData;
