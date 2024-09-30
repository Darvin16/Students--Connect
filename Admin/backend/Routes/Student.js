import express from "express";
import studentsData from "../Models/StudentsData.js";
import staffData from "../Models/StaffData.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __dirname = import.meta.dirname;

router.post("/add", async (req, res) => {
  const { user } = req;
  const studentIds = req.body;
  const uniqueStudentIds = [...new Set(studentIds)];
  const date = Date.now();
  const staff = await staffData.findOne({
    employeeId: user.employeeId,
  });

  if (!staff) {
    return res.status(403).send({
      success: false,
      message: "You are not authorized to add students",
    });
  }

  if (studentIds.length === 0) {
    return res
      .status(500)
      .send({ success: false, message: "Student ID is required" });
  }

  const resultsStudentIDs = {};

  const promises = uniqueStudentIds.map((studentId) => {
    return studentsData
      .findOne({ studentId: studentId })
      .then((student) => {
        if (student) {
          return (resultsStudentIDs[studentId] = {
            createdOn: student.createdOn,
            status: "Duplicate",
          });
        }

        return studentsData
          .create({
            studentId: studentId,
            createdOn: date,
            blockName: staff.blockName,
          })
          .then(() => {
            resultsStudentIDs[studentId] = {
              createdOn: date,
              status: "Activated",
            };
          })
          .catch((err) => {
            console.log(err);
            resultsStudentIDs[studentId] = {
              createdOn: date,
              status: "Error",
            };
          });
      })
      .catch((err) => {
        console.log(err);
        resultsStudentIDs[studentId] = {
          createdOn: date,
          status: "Error",
        };
      });
  });

  Promise.all(promises)
    .then(() => {
      const results = studentIds.map(
        (studentId) => resultsStudentIDs[studentId]
      );

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

router.post("/get", async (req, res) => {
  try {
    const { user } = req;
    const studentRecords = await studentsData
      .find({})
      .select("-_id -__v -password");

    if (user.role !== "admin") {
      const staff = await staffData.findOne({
        employeeId: user.employeeId,
      });
      const filterStudentRecords = await studentsData
        .find({
          blockName: staff.blockName,
        })
        .select("-_id -__v -password");

      if (!staff) {
        return res.status(403).send({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
      if (!filterStudentRecords) {
        return res.status(404).send({
          success: false,
          message: "No student records found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Student Records Retrieved Successfully",
        studentRecords: filterStudentRecords,
      });
    }

    if (studentRecords) {
      return res.status(200).send({
        success: true,
        message: "Student Records Retrieved Successfully",
        studentRecords: studentRecords,
      });
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

router.delete("/delete", async (req, res) => {
  const { selectedStudents } = req.body;

  if (selectedStudents.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "No students selected" });
  }

  try {
    const promises = selectedStudents.map((id) => {
      return studentsData.findOneAndDelete({ studentId: id });
    });

    const results = await Promise.all(promises);

    const deletedStudents = results.filter((student) => student !== null);

    if (deletedStudents.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No students found with the given IDs",
      });
    }

    const deleteImagePromises = deletedStudents.map((student) => {
      if (student.studentImage) {
        const imagePath = path.join(
          path.resolve(__dirname, "../../.."),
          "Student/backend",
          "Uploads/StudentImage",
          student.studentImage
        );

        // const imagePath = path.join(
        //   path.resolve(__dirname.replace("Admin", "Student"),".."),
        //   "Uploads/StudentImage",
        //   student.studentImage
        // );

        return new Promise((resolve, reject) => {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      } else {
        return Promise.resolve();
      }
    });

    await Promise.all(deleteImagePromises);

    return res.status(200).send({
      success: true,
      message: `Student${
        deletedStudents.length > 1 ? "s" : ""
      } deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error deleting students",
    });
  }
});

export default router;
