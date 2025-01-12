import express from "express";
import LatePermissions from "../Models/latePermision.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/late-permission/details/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Bad Request, Make sure you scan correct qr code",
      });
    }

    const latePermission = await LatePermissions.findOne({ _id: id });

    if (!latePermission) {
      return res
        .status(404)
        .send({ success: false, message: "Late Permission not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Late Permission fetched successfully",
      request: latePermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error Occured, please try again later",
    });
  }
});

export default router;
