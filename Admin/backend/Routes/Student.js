import express from "express";
import studentsData from "../Models/StudentsData.js";

const router = express.Router();

router.post("/add", (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(500).json({ message: "Student ID is required" });
  }

  studentsData
    .findOne({ studentId: studentId })
    .then((student) => {
      if (student) {
        return res
          .status(409)
          .send({ success: false, message: "Student Alresdy exists" });
      }

      studentsData
        .create({
          studentId: studentId,
        })
        .then((ack) => {
          return res
            .status(200)
            .send({ success: true, message: "Student added successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .send({ success: false, message: "Error adding student" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Error finding student" });
    });
});

router.post("/get", async (_, res) => {
  try {
    const studentRecords = await studentsData
      .find({})
      .select("-_id -__v -password");
    if (studentRecords) {
      return res
        .status(200)
        .send({ success: true, studentRecords: studentRecords });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "No Records found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Error fetching students" });
  }
});

router.delete("/delete", (req, res) => {
  const { selectedStudents } = req.body;

  studentsData
    .deleteMany({ studentId: { $in: selectedStudents } })
    .then((ack) => {
      return res
        .status(200)
        .send({
          success: true,
          message: `Student Record${ack.deletedCount > 1 ? "s" : ""} Deleted`,
        });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Error in Deleting Records" });
    });
});

export default router;
