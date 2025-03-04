import express from "express";
import complaint from "../Models/Complaint.js";
import staffData from "../Models/StaffData.js";
import sendEMail from "../Functions/SendEMail.js";
import PDFDocument from "pdfkit";
import path from "path";

const router = express.Router();
const __dirname = import.meta.dirname;

router.get("/fetch/complaints", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { employeeId, role } = req.user;

    const complaints = await complaint.find({
      "status.status": { $ne: "resolved" },
    });
    const complaintRecords = await complaint.find({});

    if (role !== "admin") {
      const staff = await staffData.findOne({ employeeId: employeeId });

      if (!staff) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized" });
      }

      if (staff.role !== "supervisor") {
        return res.status(200).send({
          success: true,
          message: "Complaints Fetched Successfully",
          complaints: [],
          complaintRecords: [],
        });
      }
    }

    return res.status(200).send({
      success: true,
      message: "Complaints Fetched Successfully",
      complaints,
      complaintRecords,
    });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.patch("/update/complaint", async (req, res) => {
  try {
    const { status, requestId } = req.body;
    const { employeeId } = req.user;

    const compalint = await complaint.findOne({ requestId: requestId });
    const staff = await staffData.findOne({ employeeId: employeeId });

    if (staff.role !== "supervisor") {
      return res.status(401).send({ success: true, message: "Unathorized" });
    }
    if (!compalint) {
      return res
        .status(404)
        .send({ success: false, message: "Complaint Not Found" });
    }

    if (compalint.status.status === "resolved") {
      return res.status(400).send({
        success: false,
        message: "Complaint Already Resolved",
      });
    }

    const updatedStatus = {
      status: status,
      by: staff.role,
      id: staff.employeeId,
      name: staff.name,
      time: Date.now(),
    };

    compalint.status = updatedStatus;

    const subject = "Your Complaint Update";
    const text = `Your complaint regarding ${compalint.issue} has been noticed by a Supervisor, appropriate actions are taken to resolve tne problem. \n\n You will be notified once the complaint has been resolved.`;

    await compalint.save();
    await sendEMail({
      to: compalint.studentEmail,
      subject: subject,
      text: text,
    });

    return res
      .status(200)
      .send({ success: true, message: "Complaint Updated" });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.post("/download/complaint/pdf", async (req, res) => {
  try {
    const requestId = req.body.requestId;

    const request = await complaint.findOne({ requestId: requestId });

    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request Not Found",
      });
    }

    const filename = request.studentId
      ? `Request-${request.studentId}.pdf`
      : "Request-Unkown.pdf";

    res.header("Access-Control-Expose-Headers", "Content-Disposition"); // Expose the content-disposition
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    const doc = new PDFDocument();

    doc.pipe(res);

    doc.fontSize(16).text(`Complaint Letter`, {
      align: "center",
    });

    if (request.image !== null) {
      const imagePath = path.join(
        __dirname,
        "../../../",
        "Student/backend/Uploads/ComplaintImages/",
        request.image
      );

      doc.image(imagePath, 400, 125, {
        width: 150,
        height: 150,
      });
    }

    doc
      .moveDown()
      .fontSize(12)
      .text(`Complaint Id: ${request.requestId}`)
      .text(
        `Complaint Raised On ${new Date(request.requestDate).toLocaleDateString(
          "en-GB"
        )}`
      )
      .text(`Student Id: ${request.studentId}`)
      .text(`Student Name: ${request.studentName}`)
      .text(`Student Email: ${request.studentEmail}`)
      .text(`Block: ${request.studentBlockName}`)
      .text(`Room Number: ${request.studentRoomNumber}`)
      .text(`Issue: ${request.issue}`)
      .text(`Description: ${request.description}`)
      .moveDown()
      .moveDown()
      .moveDown()
      .text(`Status: ${request.status.status}`)
      .text(`By: ${request.status.by}`)
      .text(`Id: ${request.status.id}`)
      .text(`Name: ${request.status.name}`)
      .text(
        `Approved On: ${new Date(request.status.time).toLocaleDateString(
          "en-GB"
        )}`
      );

    doc.end();
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
