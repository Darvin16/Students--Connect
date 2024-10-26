import express from "express";
import studentsData from "../Models/StudentsData.js";
import leaveRequest from "../Models/LeaveRequest.js";
import generateUniqueId from "../Functions/generateUniqueId.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const router = express.Router();

const __dirname = import.meta.dirname;
const IMAGE_SOURCE_FOLDER = path.join(__dirname, "..", "Uploads/StudentImage");
const IMAGE_DESTINATION_FOLDER = path.join(
  __dirname,
  "..",
  "Uploads/LeaveImages"
);

router.post("/leave-request/raise", async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentBlockName,
      parentContactNo,
      reason,
      leaveType,
      from,
      to,
      oneDayLeave,
      terms_conditions,
    } = req.body;

    const startOfDay = new Date().setHours(0, 0, 0, 0);

    if (
      !studentId ||
      !studentName ||
      !studentBlockName ||
      !parentContactNo ||
      !reason ||
      !leaveType ||
      !from ||
      !to
    ) {
      return res
        .status(400)
        .send({ success: true, message: `Please fill all the fields` });
    }
    if (!terms_conditions) {
      return res.status(400).send({
        success: false,
        message: "Please accept the terms and conditions",
      });
    }
    const student = await studentsData.findOne({ studentId: studentId });

    if (!student) {
      return res
        .status(404)
        .send({ success: false, message: `Student ${studentId} not found` });
    }

    if (Date.parse(from) <= Date.now()) {
      return res.status(409).send({
        success: false,
        message: `Leave cannot be applied for a date in the past or for today`,
      });
    }

    if (Date.parse(from) > Date.parse(to)) {
      return res.status(409).send({
        success: false,
        message: "You can't apply request for past days",
      });
    }

    const studentLeaveRequest = await leaveRequest.findOne({
      studentId: studentId,
      from: Date.parse(from),
      "cancelRequest.status": false,
    });

    if (studentLeaveRequest) {
      return res.status(409).send({
        success: false,
        message: `You have already raised a leave request for ${from}`,
      });
    }

    const todayLeaveRequest = await leaveRequest.find({
      studentId: studentId,
      requestDate: { $gte: startOfDay },
    });

    if (todayLeaveRequest.length >= 2) {
      return res.status(409).send({
        success: false,
        message: `You have exceeded the daily limit, You have already raised 2 leave requests for today`,
      });
    }

    const sourcePath = path.join(IMAGE_SOURCE_FOLDER, student.studentImage);
    const destinationPath = path.join(
      IMAGE_DESTINATION_FOLDER,
      student.studentImage
    );

    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ success: false, message: "Error in uploading image" });
      }
    });

    const ack = await leaveRequest.create({
      requestId: generateUniqueId(),
      studentId: studentId,
      studentImage: student.studentImage,
      studentName: studentName,
      studentBlockName: studentBlockName,
      studentRoomNumber: student.roomNumber,
      studentDepartment: student.department,
      studentBranchName: student.branchName,
      studentAcademicYear: student.academicYear,
      studentContectNo: student.phone,
      parentContactNo: parentContactNo,
      requestDate: Date.now(),
      reason: reason,
      leaveType: leaveType,
      from: Date.parse(from),
      to: Date.parse(to),
      oneDayLeave: oneDayLeave,
    });

    if (ack) {
      return res.status(200).send({
        success: true,
        message: "Leave Request Submitted Successfully",
      });
    } else {
      return res
        .status(500)
        .send({ success: false, message: "Failed to submit leave Request" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.post("/leave-request/cancel", async (req, res) => {
  try {
    const { requestId, reason } = req.body;
    const startOfDay = new Date().setHours(0, 0, 0, 0);

    if (!requestId || !reason) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const leaveRequestData = await leaveRequest.findOne({
      requestId: requestId,
    });
    if (!leaveRequestData) {
      return res.status(404).send({
        success: false,
        message: "Leave Request Not Found",
      });
    }

    const leaveDate = new Date(leaveRequestData.from).setHours(0, 0, 0, 0);

    if (
      leaveDate === startOfDay &&
      leaveRequestData.wardenApproval &&
      leaveRequestData.SROApproval
    ) {
      return res.status(409).send({
        success: false,
        message: "You can't cancel the request on the day of leave.",
      });
    }

    leaveRequestData.cancelRequest.status = true;
    leaveRequestData.cancelRequest.reason = reason;
    leaveRequestData.cancelRequest.time = Date.now();
    await leaveRequestData.save().then((ack) => {
      if (ack) {
        return res.status(200).send({
          success: true,
          message: "Leave Request Cancelled Successfully",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Failed to cancel leaveRequest",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/leave-request/fetch", async (req, res) => {
  try {
    const { user } = req;
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const leaveRequests = await leaveRequest
      .find({
        studentId: user.studentId,
        from: { $gte: startOfDay },
        "cancelRequest.status": false,
      })
      .select("-_id -__v");
    const leaveRequestOption = leaveRequests.map((request, index) => {
      const optionSet = {
        value: request.from,
        option: `${new Date(request.from).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} - ${new Date(request.to).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}`,
      };

      return optionSet;
    });

    return res.status(200).send({
      success: true,
      leaveRequests: leaveRequests,
      leaveRequestOption: leaveRequestOption,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/generate/pdf", async (req, res) => {
  try {
    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).send({
        success: false,
        message: "Need the Request Id to generate PDF",
      });
    }

    const request = await leaveRequest.findOne({ requestId: requestId });
    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request not found",
      });
    }

    const filename = request.studentId
      ? `Request-${request.studentId}.pdf`
      : "Request-Unknown.pdf";
    const status =
      request.wardenApproval.status && request.SROApproval.status
        ? request.wardenApproval.status === "approved" &&
          request.SROApproval.status === "approved"
          ? "(Approved)"
          : "(Rejected)"
        : "(Pending)";
    const reason = `On ${new Date(request.requestDate).toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}, you submitted a leave request for the ${
      request.oneDayLeave
        ? `date of ${new Date(request.from).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`
        : `period of ${new Date(request.from).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })} to ${new Date(request.to).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`
    } for the reason "${request.reason}"`;
    let text = "";
    const imagePath = path.join(IMAGE_DESTINATION_FOLDER, request.studentImage);

    if (request.wardenApproval.status) {
      if (request.wardenApproval.status === "approved") {
        if (request.SROApproval.status) {
          if (request.SROApproval.status === "approved") {
            text = `Your Request has beed Approved by the warden - ${
              request.wardenApproval.wardenName
            } of the block (${request.studentBlockName}) on ${new Date(
              request.wardenApproval.time
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              // dayPeriod: "short",
              weekday: "short",
            })} and by the SRO  - ${
              request.SROApproval.SROName
            } of the block (${request.studentBlockName}) on ${new Date(
              request.SROApproval.time
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              // dayPeriod: "short",
              weekday: "short",
            })}, so the requested ${
              request.oneDayLeave ? "leave" : "leaves"
            } has been granted.`;
          } else {
            text = `Your Request has beed Approved by the warden - ${
              request.wardenApproval.wardenName
            } of the block (${request.studentBlockName}) on ${new Date(
              request.wardenApproval.time
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              // dayPeriod: "short",
              weekday: "short",
            })} but Rejected by the SRO  - ${
              request.SROApproval.SROName
            } of the block (${request.studentBlockName}) on ${new Date(
              request.SROApproval.time
            ).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              // dayPeriod: "short",
              weekday: "short",
            })}, so the requested ${
              request.oneDayLeave ? "leave is" : "leaves are"
            } not granted.`;
          }
        } else {
          text = `Your Request has beed Approved by the warden - ${
            request.wardenApproval.wardenName
          } of the block (${request.studentBlockName}) on ${new Date(
            request.wardenApproval.time
          ).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            // dayPeriod: "short",
            weekday: "short",
          })}, so please wait patiently for the confirmation of the SRO of the block (${
            request.studentBlockName
          }).`;
        }
      } else {
        text = `Your Request has been Rejected by the warden - ${
          request.wardenApproval.wardenName
        } of the block (${request.studentBlockName}) on ${new Date(
          request.wardenApproval.time
        ).toLocaleString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          // dayPeriod: "short",
          weekday: "short",
        })}, so requested ${
          request.oneDayLeave ? "leave is" : "leaves are"
        } not granted`;
      }
    } else {
      text = `Your Request has been Send to Warden, Please wait patiently for his response`;
    }

    res.header("Access-Control-Expose-Headers", "Content-Disposition");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    const doc = new PDFDocument();

    doc.pipe(res);

    doc
      .fontSize(24)
      .text(`Leave Request of ${request.studentId}`, {
        align: "center",
      })
      .fontSize(12)
      .fillColor(
        `${
          status === "(Pending)"
            ? "gray"
            : status === "(Approved)"
            ? "green"
            : "red"
        }`
      )
      .text(status, {
        align: "center",
      });

    doc
      .moveDown()
      .fontSize(14)
      .fillColor("black")
      .text(`Name: ${request.studentName}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Student Id: ${request.studentId}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Block: ${request.studentBlockName}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Room no: ${request.studentRoomNumber}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Department: ${request.studentDepartment}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Branch: ${request.studentBranchName}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Academic Year: ${request.studentAcademicYear}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Student Contact No: ${request.studentContactNo}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Parent Contact No: ${request.parentContactNo}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`Reason: ${request.leaveType.replace(/_/g, " ")}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`${reason}`, {
        align: "left",
        indent: 30,
        lineGap: 10,
      })
      .text(`Status: ${status}`, {
        align: "left",
        lineGap: 10,
      })
      .text(`${text}`, {
        align: "left",
        indent: 30,
        lineGap: 10,
      });

    doc.image(imagePath, 400, 125, {
      width: 150,
      height: 150,
    });

    doc.end();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
