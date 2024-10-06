import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEMail from "../Functions/SendEMail.js";
import studentsData from "../Models/StudentsData.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await studentsData.findOne({
      studentId: userId,
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (!user.password) {
      return res.status(409).send({
        success: false,
        message: "Password is not set, please sign up and set your password",
      });
    }

    const token = await jwt.sign(
      { userId: user.studentId, email: user.email, department: user.department },
      process.env.secretKey,
      { expiresIn: "1h" }
    );

    sendEMail({
      to: user.email,
      subject: "Reset Password",
      text: `You are receiving this because you (or someone else) have requested to reset your password.
            Please click on the following link, or paste it into your browser to complete the process:
            ${req.headers.origin}/reset-password/${token}.
                   
            The link will valid for 1 hour`,
    })
      .then((info) => {
        res.status(200).send({
          success: true,
          message: "Password reset link sent to your email",
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Error sending email",
        });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "please provide all required data",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Password and confirm Password didn't match",
      });
    }

    const decoded = await jwt.verify(token, process.env.secretKey);
    const user = await studentsData.findOne({
      studentId: decoded.userId,
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

export default router;
