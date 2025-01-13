import express from "express";
import LatePermissions from "../Models/latePermision.js";
import studentsData from "../Models/StudentsData.js";

const router = express.Router();

router.get("/late-permission/fetch", async (req, res) => {
  try {
    const { studentId } = req.user;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    if (!studentId) {
      throw new Error("StudentId is Missing");
    }

    const requests = await LatePermissions.find({
      studentId: studentId,
      date: { $gte: startOfDay },
      "status.status": { $ne: "cancelled" },
    }).select("-__v");

    return res
      .status(200)
      .send({
        success: true,
        message: "Requests Fetched",
        request: requests[0] || {},
      });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/late-permission/request", async (req, res) => {
  try {
    const { id, name, reason, outTime, inTime } = req.body;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    if (!id || !name || !reason || !outTime || !inTime) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const student = await studentsData.findOne({ studentId: id });
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student Not Found, Recheck your Id!",
      });
    }

    const requests = await LatePermissions.find({
      studentId: student.studentId,
      date: { $gte: startOfDay },
      "status.status": { $ne: "cancelled" },
    }).select("-__v");

    if (requests.length != 0) {
      return res
        .status(400)
        .json({ success: false, message: "You have already requested" });
    }

    const requset = {
      studentId: student.studentId,
      studentImage: student.studentImage,
      studentName: name,
      studentBlockName: student.blockName,
      studentRoomNumber: student.roomNumber,
      studentDepartment: student.department,
      studentAcademicYear: student.academicYear,
      studentContactNo: student.phone,
      reason: reason,
      date: Date.now(),
      outTime: outTime,
      inTime: inTime,
    };
    await LatePermissions.create(requset);

    return res
      .status(200)
      .send({ success: true, message: "Request Submitted Successfully" });
  } catch (error) {
    console.log("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.patch("/late-permission/cancel", async (req, res) => {
  try {
    const { id } = req.body;
    const { studentId } = req.user;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    if (!studentId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const student = await studentsData.findOne({ studentId: studentId });

    if (!student) {
      return res
        .status(404)
        .send({ success: false, message: "Student Not Found" });
    }

    const request = await LatePermissions.findOne({ _id: id });

    if (!request) {
      return res
        .status(404)
        .send({ success: false, message: "Request Not Found" });
    }

    // if (request.status.status != "pending") {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Request already Resolved" });
    // }

    const status = {
      status: "cancelled",
      by: "Student",
      id: student.studentId,
      name: student.name,
      time: Date.now(),
    };

    request.status = status;

    await request.save();

    return res
      .status(200)
      .send({ success: true, message: "Request Cancelled Successfully" });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
