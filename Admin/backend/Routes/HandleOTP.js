import express from "express";
import bcrypt from "bcrypt";
import sendEMail from "../Functions/SendEMail";
import generateOTP from "../Functions/generateOTP";
import staffData from "../Models/StaffData";
import OTP from "../Models/OTP";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await staffData.findOne({ employeeId: userId });
    const otp = generateOTP();

    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "Require user id" });
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Exist",
      });
    }
    if (!user.password) {
      return res.status(409).send({
        success: false,
        message: "Password not set, please Sign up",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    await OTP.create({
      userId: user.employeeId,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    }).catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error in generating OTP",
      });
    });

    sendEMail({
      to: user.email,
      subject: "OTP to Reset Password",
      text: `Your otp to reset the password is ${otp}`,
    })
      .then((ack) => {
        if (ack) {
          return res.status(200).send({
            success: true,
            message: "OTP sent to your email",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status.send({
          success: false,
          message: "Error in sending OTP via email",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/regenerate", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await staffData.findOne({ employeeId: userId });
    const otp = generateOTP();
    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "Require user id" });
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    await OTP.deleteMany({ userId: userId }).catch((err) => {
      console.log(err);
    });
    await OTP.create({
      userId: userId,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    }).catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error in resending OTP",
      });
    });

    sendEMail({
      to: user.email,
      subject: "OTP to Reset Password",
      text: `Your OTP for reseting the password is ${otp}`,
    })
      .then((ack) => {
        if (ack) {
          return res.status(200).send({
            success: true,
            message: "OTP sent to your email",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status.send({
          success: false,
          message: "Error in sending OTP via email",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const otpData = await OTP.find({ userId: userId });

    if (!otp || !userId) {
      return res.status(400).send({
        success: false,
        message: "Invalid request",
      });
    }
    if (otpData.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No OTP found for this user, please try again",
      });
    }
    if (otpData[0].expiresAt < Date.now()) {
      await OTP.deleteMany({ userId: userId });
      return res.status(404).send({
        success: false,
        message: "OTP has expired, please try again",
      });
    }

    const isMatch = await bcrypt.compare(otp, otpData[0].otp);

    if (isMatch) {
      await OTP.deleteMany({ userId: userId });
      return res.status(200).send({
        success: true,
        message: "Your are verified",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
