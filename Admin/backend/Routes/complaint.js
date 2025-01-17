import express from "express";
import complaint from "../Models/Complaint.js";
import staffData from "../Models/StaffData.js";

const router = express.Router();

router.get("/fetch/complaints", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { employeeId } = req.user;

    const complaints = await complaint.find({
      requestDate: { $gte: startOfDay },
    });
    const complaintRecords = await complaint.find({});

    const staff = await staffData.findOne({ employeeId: employeeId });

    if (!staff) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    return res
      .status(200)
      .send({
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

export default router;
