import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import studentsData from "./Models/StudentsData.js";
import libraryRequest from "./Models/LibraryRequest.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static("Uploads"));

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/StudentImage");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("studentImage");

function generateUniqueId(n) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < n; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

app.post("/signup", multer().none(), (req, res) => {
  const {
    studentId,
    name,
    phone,
    email,
    department,
    address,
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
    !address ||
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
          student.address &&
          student.gender &&
          student.password
        ) {
          return res.status(400).send({
            success: false,
            message: "Account already exists , Please Login",
          });
        }

        if (student.blockName !== blockName) {
          return res.status(400).send({
            success: false,
            message: `Your not a Student of ${blockName} Block`,
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
            student.roomNumber = roomNumber;
            student.gender = gender;
            student.password = hash;
            student.address = address;

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
    return res.sendStatus(401);
  }
});

app.post("/fetch/user", (req, res) => {
  const { user } = req;

  studentsData
    .findOne({ studentId: user.studentId })
    .select("-_id -__v -password")
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
      });
    });
});

app.post("/fetch/library/request", async (req, res) => {
  try {
    const { user } = req;
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const libraryRequestForm = await libraryRequest.findOne({
      studentId: user.studentId,
      requestDate: { $gte: startOfDay },
      "cancelRequest.status": false,
    });

    if (libraryRequestForm) {
      return res.status(200).send({
        success: true,
        message: "Library Request Fetched Successfully",
        libraryRequestForm: libraryRequestForm,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Library Request not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/library/request", async (req, res) => {
  const {
    name,
    phone,
    department,
    branchName,
    blockName,
    roomNumber,
    description,
    academicYear,
    terms_conditions,
  } = req.body;

  if (
    !name ||
    !phone ||
    !department ||
    !branchName ||
    !blockName ||
    !roomNumber ||
    !academicYear ||
    !description
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Missing Required Data" });
  }
  if (!terms_conditions) {
    return res.status(400).send({
      success: false,
      message: "Please accept the Terms and Conditions",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const existingRequest = await libraryRequest.findOne({
    studentId: req.user.studentId,
    requestDate: { $gte: startOfDay },
    "cancelRequest.status": false,
  });

  if (existingRequest) {
    return res.status(409).send({
      success: false,
      message: "You have already submitted a request today.",
    });
  }

  await libraryRequest
    .create({
      requestId: generateUniqueId(12),
      studentId: req.user.studentId,
      studentName: name,
      studentBlockName: blockName,
      studentRoomNumber: roomNumber,
      studentDepartment: department,
      studentBranchName: branchName,
      studentAcademicYear: academicYear,
      studentContactNo: phone,
      description: description,
      requestDate: Date.now(),
    })
    .then((ack) => {
      return res.status(200).send({
        success: true,
        message: "Request Submitted Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Error Submitting Request" });
    });
});

app.post("/library/request/cancel", async (req, res) => {
  try {
    const { requestId, reason } = req.body;
    const request = await libraryRequest.findOne({ requestId: requestId });
    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request Not Found",
      });
    }

    if (Object.keys(request.in).length > 0) {
      return res.status(409).send({
        success: false,
        message: "Request is can't be cancelled.",
      });
    }

    request.cancelRequest.status = true;
    request.cancelRequest.time = Date.now();
    request.cancelRequest.reason = reason;
    await request.save().then(() => {
      return res.status(200).send({
        success: true,
        message: "Request cancelled Successfully",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
});

app.post("/add/profile/image", upload, async (req, res) => {
  try {
    const { file, user } = req;

    const student = await studentsData.findOne({ studentId: user.studentId });

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Student Not Found",
      });
    }

    if (student.studentImage) {
      const imagePath = path.join(
        __dirname,
        "Uploads/StudentImage",
        student.studentImage
      );

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(409).send({
            success: false,
            message: "Can't delete the past image, Try again later",
          });
        }
      });
    }

    student.studentImage = file.filename;

    student
      .save()
      .then(() => {
        return res.status(200).send({
          success: true,
          message: "Profile Image Added Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ success: false, message: "Server Error in saving Image" });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
});

app.put("/student/edit", async (req, res) => {
  const {
    name,
    email,
    phone,
    department,
    branchName,
    roomNumber,
    academicYear,
    gender,
    address,
  } = req.body;

  const { user } = req;

  if (
    !name ||
    !email ||
    !phone ||
    !department ||
    !branchName ||
    !roomNumber ||
    !academicYear ||
    !gender ||
    !address
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }

  studentsData
    .findOneAndUpdate(
      {
        studentId: user.studentId,
      },
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          gender: gender,
          address: address,
          department: department,
          branchName: branchName,
          academicYear: academicYear,
          roomNumber: roomNumber,
        },
      }
    )
    .then(() => {
      return res
        .status(200)
        .send({ success: true, message: "Your details updated Successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
