import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import studentsData from "./Models/StudentsData.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/StudentConnect")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.post("/signup", (req, res) => {
  const {
    studentId,
    name,
    phone,
    email,
    department,
    branchName,
    academicYear,
    roomNumber,
    gender,
    password,
    confirmPassword,
    blockName,
  } = req.body;

  if (
    !studentId ||
    !name ||
    !phone ||
    !email ||
    !department ||
    !branchName ||
    !academicYear ||
    !blockName ||
    !roomNumber ||
    !gender ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "Password and Confirm Password doesn't match",
    });
  }

  studentsData
    .findOne({ studentId: studentId })
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          success: false,
          message: "User Not Exist in the Database",
        });
      } else {
        if (
          student.name &&
          student.email &&
          student.phone &&
          student.department &&
          student.branchName &&
          student.academicYear &&
          student.blockName &&
          student.roomNumber &&
          student.gender &&
          student.password
        ) {
          return res.status(400).send({
            success: false,
            message: "Account already exists , Please Login",
          });
        }

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ success: false, message: "Error Occured" });
          }

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({ success: false, message: "Error Occured" });
            }

            student.name = name;
            student.email = email;
            student.phone = phone;
            student.department = department;
            student.branchName = branchName;
            student.academicYear = academicYear;
            student.blockName = blockName;
            student.roomNumber = roomNumber;
            student.gender = gender;
            student.password = hash;

            student
              .save()
              .then((ack) => {
                if (ack) {
                  return res.status(200).send({
                    success: true,
                    message: "Account Created Successfully",
                  });
                } else {
                  return res.status(404).send({
                    success: false,
                    message: "Failed to Create Account, please try again",
                  });
                }
              })
              .catch((err) => {
                return res.status(500).send({
                  success: false,
                  message: "Error Occured while saving records",
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ success: false, message: "Error Occured" });
    });
});

app.post("/login", (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    return res.status(400).send({
      success: false,
      message: "Please enter both student Id and Password",
    });
  }

  studentsData
    .findOne({ studentId: studentId })
    .then((student) => {
      if (!student) {
        return res.status(404).send({
          success: false,
          message: "Student not found",
        });
      } else {
        if (!student.password) {
          return res.status(400).send({
            success: false,
            message: "Password not set , Please sign up first",
          });
        }

        bcrypt.compare(password, student.password, (err, isMatch) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              success: false,
              message: "Error Occured while comparing password",
            });
          }

          if (!isMatch) {
            return res.status(401).send({
              success: false,
              message: "Invalid Password",
            });
          } else {
            const authToken = jwt.sign(
              { studentId: student.studentId, department: student.department },
              process.env.secretKey
            );

            return res.status(200).send({
              success: true,
              message: "Login Successfull",
              token: authToken,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error Occured while finding student",
      });
    });
});

app.use((req, res, next) => {
  const authToken = req.headers.authtoken;
  if (authToken) {
    jwt.verify(authToken, process.env.secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Token" });
      }

      req.user = decoded;
      next();
    });
  } else {
    return res.sendStatus(401)
  }
});

app.post("/fetch/user", (req, res) => {
  const { user } = req;

  studentsData
    .findOne({ studentId: user.studentId })
    .select("-_id -__v")
    .then((userData) => {
      if (userData) {
        return res.status(200).send({
          success: true,
          message: "User Fetched Successfully",
          user: userData,
        });
      } else {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Error Occured while finding user",
        })
    });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
