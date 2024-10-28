import express from "express";
import leaveRequest from "../Models/LeaveRequest.js";
import staffData from "../Models/StaffData.js";

const router = express.Router();

router.post("/leave-request/update", async (req, res) => {
  try {
    const { id, status, updateMany } = req.body;
    if (!id || !status) {
      return res.status(400).send({
        success: false,
        message: "Invalid request, data isn't passed correctly",
      });
    }

    const { user } = req;
    const staff = await staffData.findOne({ employeeId: user.employeeId });

    if (!staff) {
      return res.status(404).send({
        success: false,
        message: "Your don't have access to update the status",
      });
    }

    if (id === "many") {
      if (!updateMany.from || !updateMany.to || !updateMany.leaveType) {
        return res.status(400).send({
          success: false,
          message: "Invalid Request, Please Provide fill all the Fields",
        });
      }

      const approvalData = {
        status: status,
        by: staff.employeeId,
        time: Date.now(),
        ...(staff.role === "warden" ? { wardenName: staff.name } : {}),
        ...(staff.role === "SRO" ? { SROName: staff.name } : {}),
      };

      let query = {
        studentBlockName: staff.blockName,
        from: { $gte: new Date(updateMany.from).setHours(0, 0, 0, 0) },
        to: { $lte: new Date(updateMany.to).setHours(0, 0, 0, 0) },
        [`${staff.role}Approval.status`]: { $exists: false },
      };

      if (updateMany.leaveType !== "all") {
        query.leaveType = updateMany.leaveType;
      }

      const leaveRequestsList = await leaveRequest.updateMany(query, {
        $set: {
          [`${staff.role}Approval`]: approvalData,
        },
      });

      if (leaveRequestsList.modifiedCount > 0) {
        return res.status(200).send({
          success: true,
          message: `${leaveRequestsList.modifiedCount} Leave${
            leaveRequestsList.modifiedCount > 1 ? "s" : ""
          } Requests Updated Successfully`,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "No Leave Requests Found for the specified conditions",
        });
      }
    } else {
      const leaveRequestDoc = await leaveRequest.findOne({ requestId: id });
      if (!leaveRequestDoc) {
        return res.status(404).send({
          success: false,
          message: "Leave request not found",
        });
      }

      if (staff.role === "warden") {
        leaveRequestDoc.wardenApproval.status = status;
        leaveRequestDoc.wardenApproval.by = staff.employeeId;
        leaveRequestDoc.wardenApproval.time = Date.now();
        leaveRequestDoc.wardenApproval.wardenName = staff.name;
      } else if (staff.role === "SRO") {
        leaveRequestDoc.SROApproval.status = status;
        leaveRequestDoc.SROApproval.by = staff.employeeId;
        leaveRequestDoc.SROApproval.time = Date.now();
        leaveRequestDoc.SROApproval.SROName = staff.name;
      }

      await leaveRequestDoc.save().then((ack) => {
        if (ack) {
          return res.status(200).send({
            success: true,
            message: "Leave request status updated successfully",
          });
        } else {
          return res.status(500).send({
            success: false,
            message: "Failed to update leave request status",
          });
        }
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

router.get("/fetch/leave-request", async (req, res) => {
  try {
    const { user } = req;

    if (user.role === "admin") {
      const leaveRecords = await leaveRequest.find({});
      return res.status(200).send({
        success: true,
        leaveRequests: [],
        leaveRecords: leaveRecords,
        message:
          "Admin doesn't requires leaveRequests , admin can see the details in leaveRecords",
      });
    }

    const staff = await staffData.findOne({
      employeeId: user.employeeId,
    });

    if (!staff) {
      return res.status(404).send({
        success: false,
        message: "Staff not found",
      });
    }

    if (staff.role === "warden") {
      const leaveRequests = await leaveRequest.find({
        studentBlockName: staff.blockName,
        "wardenApproval.status": { $exists: false },
        "cancelRequest.status": false,
        from: { $gte: Date.now() },
      });
      const leaveRecords = await leaveRequest.find({
        studentBlockName: staff.blockName,
      });
      return res.status(200).send({
        success: true,
        leaveRequests: leaveRequests,
        leaveRecords: leaveRecords,
      });
    } else if (staff.role === "SRO") {
      const leaveRequests = await leaveRequest.find({
        studentBlockName: staff.blockName,
        "SROApproval.status": { $exists: false },
        "cancelRequest.status": false,
        from: { $gte: Date.now() },
      });
      const leaveRecords = await leaveRequest.find({
        studentBlockName: staff.blockName,
      });
      return res.status(200).send({
        success: true,
        leaveRequests: leaveRequests,
        leaveRecords: leaveRecords,
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
