import express from "express";
import studentsData from "../Models/StudentsData.js";

const router = express.Router();

router.post("/add", (req, res) => {
  const studentIds = req.body;
  const date = Date.now();

  if (studentIds.length === 0) {
    return res
      .status(500)
      .send({ success: false, message: "Student ID is required" });
  }

  const promises = studentIds.map((studentId) => {
    return studentsData
      .findOne({ studentId: studentId })
      .then((student) => {
        if (student) {
          return {
            createdOn: student.createdOn,
            status: "Duplicate",
          };
        }

        return studentsData
          .create({
            studentId: studentId,
            createdOn: date,
          })
          .then(() => {
            return {
              createdOn: date,
              status: "Activated",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              createdOn: date,
              status: "Error",
            };
          });
      })
      .catch((err) => {
        console.log(err);
        return {
          createdOn: date,
          status: "Error",
        };
      });
  });

  Promise.all(promises)
    .then((results) => {
      return res.status(200).send({
        success: true,
        message: "Student Addition Successfully Completed",
        results: results,
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
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

  if (selectedStudents.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "No students selected" });
  }

  studentsData
    .deleteMany({ studentId: { $in: selectedStudents } })
    .then((ack) => {
      return res.status(200).send({
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
