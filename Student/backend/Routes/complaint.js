import express from "express";
import { uploadComplaint } from "../Functions/upload.js";
import complaint from "../Models/Complaint.js";
import studentsData from "../Models/StudentsData.js";
import sendEMail from "../Functions/SendEMail.js";
import generateUniqueId from "../Functions/generateUniqueId.js";

const router = express.Router();

router.post("/raise/complaint", uploadComplaint, async (req, res) => {
  try {
    const {
      registrationNo,
      studentName,
      blockName,
      roomNo,
      issueType,
      description,
      hasPhoto,
    } = req.body;
    let filename = null;

    if (
      !registrationNo ||
      !studentName ||
      !blockName ||
      !roomNo ||
      !issueType ||
      !description
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all fields" });
    }

    const student = await studentsData.find({ studentId: registrationNo });

    if (!student) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized, Not a Hostal Student",
      });
    }

    if (hasPhoto === "true") {
      if (!req.file) {
        return res
          .status(400)
          .send({ success: false, message: "Please provide Image" });
      }
      filename = req.file.filename;
    }

    const complaintId = generateUniqueId();
    
    await complaint.create({
      requestId: complaintId,
      studentId: registrationNo,
      studentName: studentName,
      studentEmail: student.email,
      studentBlockName: blockName,
      studentRoomNumber: roomNo,
      issue: issueType,
      description: description,
      image: filename,
      requestDate: Date.now(),
    });

    const subject = "Complaint Raised Successfully";
    const text =
      "Your complaint has been received, Supervisor will take action as soon as possible";

    await sendEMail({ to: student.email, subject: subject, text: text });

    return res
      .status(200)
      .send({ success: true, message: "Complaint Raised Successfully" });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
