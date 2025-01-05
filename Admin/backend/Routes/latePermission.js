import express from "express";
import staffData from "../Models/StaffData.js";
import LatePermissions from "../Models/LatePermision.js";

const router = express.Router();

router.get("/late-permission/fetch", async (req, res) => {
  try {
    const { employeeId } = req.user;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    if (!employeeId) {
      throw new Error("Error in Authentication");
    }

    const user = await staffData.findOne({ employeeId: employeeId });
    if (!user) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    const requests = await LatePermissions.find({
      studentBlockName: user.blockName,
      date: { $gte: startOfDay },
      "status.status": { $ne: "cancelled" },
    });

    return res
      .status(200)
      .send({
        success: true,
        message: "Late permissins Fetched successfully",
        requests,
      });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.put("/late-permission/update", async (req, res) => {
  try {
    const { id, status } = req.body;
    const { employeeId } = req.user;

    if (!id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    if (!employeeId) {
      throw new Error("Error in Authentication");
    }

    const user = await staffData.findOne({ employeeId: employeeId });
    if (!user || (user.role !== "SRO" && user.role !== "warden")) {
      return res
        .status(401)
        .send({ success: false, message: "User isn't Authorized" });
    }

    const request = await LatePermissions.findOne({ _id: id });
    if (!request) {
      return res
        .status(404)
        .send({ success: false, message: "Request not found" });
    }
    if (request.status.status !== "pending") {
      return res
        .status(400)
        .send({ success: false, message: "Request Already Resolved" });
    }

    const updatedStatus = {
      status: status,
      by: user.role,
      id: user.employeeId,
      name: user.name,
      time: Date.now(),
    };

    request.status = updatedStatus;
    await request.save();

    return res
      .status(200)
      .send({ success: true, message: "Request Updated Successfully" });
  } catch (error) {
    console.error("Error: ", error.message, error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
