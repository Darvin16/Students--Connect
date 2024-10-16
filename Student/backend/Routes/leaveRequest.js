import express from "express";
import studentsData from "../Models/StudentsData.js";
import leaveRequest from "../Models/LeaveRequest.js";
import generateUniqueId from "../Functions/generateUniqueId.js";

const router = express.Router();

router.post("/leave-request/raise", async (req, res) => {
  try {
    const {
      studentId,
      studentImage,
      studentName,
      studentBlockName,
      studentRoomNumber,
      studentDepartment,
      studentBranchName,
      studentAcademicYear,
      parentContactNo,
      reason,
      leaveType,
      from,
      to,
      oneDayLeave,
    } = req.body;

    const startOfDay = new Date().setHours(0, 0, 0, 0);

    if (
      !studentId ||
      !studentImage ||
      !studentName ||
      !studentBlockName ||
      !studentRoomNumber ||
      !studentDepartment ||
      !studentBranchName ||
      !studentAcademicYear ||
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
    const student = await studentsData.findOne({ studentId: studentId });

    if (!student) {
      return res
        .status(404)
        .send({ success: false, message: `Student ${studentId} not found` });
    }

    if (Date.parse(from) <= Date.now()) {
      return res.status(409).send({
        success: false,
        message: `Leave cannot be applied for a date in the past`,
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

    const ack = await leaveRequest.create({
      requestId: generateUniqueId(),
      studentId: studentId,
      studentImage: studentImage,
      studentName: studentName,
      studentBlockName: studentBlockName,
      studentRoomNumber: studentRoomNumber,
      studentDepartment: studentDepartment,
      studentBranchName: studentBranchName,
      studentAcademicYear: studentAcademicYear,
      studentContectNo: student.studentContectNo,
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
    if ((!requestId, reason)) {
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

export default router;
