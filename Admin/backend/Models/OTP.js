import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Number,
  expiresAt: Number,
});

const OTP = mongoose.model("otp", OTPSchema);

export default OTP;
