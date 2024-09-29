import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminData from "./Models/AdminData.js";
import staffData from "./Models/StaffData.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Student from "./Routes/Student.js";
import libraryRequest from "./Models/LibraryRequest.js";
import studentsData from "./Models/StudentsData.js";
import PDFDocument from "pdfkit";
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
    console.log("Database connected successfully");
    adminData.findOne({}).then((admin) => {
      if (!admin) {
        adminData.create({
          admin_email: "admin@gmail.com",
          password: "123",
        });
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", () => {
  console.log("Server is running");
});

const storage = multer.diskStorage({
  destination: "Uploads/StaffImages",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("staffImage");

app.post("/login/staff", (req, res) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) {
    return res.status(400).send({
      success: false,
      message: "Please enter both employeeId and password",
    });
  }

  staffData
    .findOne({ employeeId: employeeId })
    .then((staff) => {
      if (!staff) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid Credentials" });
      } else {
        if (!staff.password) {
          return res.status(400).send({
            success: false,
            message: "Password not set , Please sign up first",
          });
        }

        bcrypt.compare(password, staff.password, (err, isMatch) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: "Error in password comparition",
            });
          }

          if (isMatch) {
            const authToken = jwt.sign(
              { employeeId: staff.employeeId, role: staff.role },
              process.env.secretKey
            );

            return res.status(200).send({
              success: true,
              message: "Logged In Successfully",
              token: authToken,
            });
          } else {
            return res.status(400).send({
              success: false,
              message: "Incorrect Password",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/signup/staff", (req, res) => {
  const {
    employeeId,
    name,
    phone,
    email,
    role,
    address,
    gender,
    password,
    confirmPassword,
    blockName,
  } = req.body;

  if (
    !employeeId ||
    !name ||
    !address ||
    !phone ||
    !email ||
    !role ||
    !gender ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }

  if (role !== "librarian" && !blockName) {
    return res
      .status(400)
      .send({ success: false, message: "Please select a block name" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "Password and Confirm Password doesn't match",
    });
  }

  staffData
    .findOne({ employeeId: employeeId })
    .then((staff) => {
      if (!staff) {
        return res
          .status(401)
          .send({ success: false, message: "Staff Not Found in Database" });
      } else {
        if (
          staff.name &&
          staff.email &&
          staff.phone &&
          staff.role &&
          staff.gender &&
          staff.address &&
          staff.password
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
              .send({ success: false, message: "Error in generating salt" });
          }

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return res.status(500).send({
                success: false,
                message: "Error in hashing password",
              });
            }

            staff.name = name;
            staff.phone = phone;
            staff.email = email;
            staff.role = role;
            staff.gender = gender;
            staff.password = hash;
            staff.blockName = blockName || null;
            staff.address = address;

            staff
              .save()
              .then(() => {
                return res.status(200).send({
                  success: true,
                  message: "Staff Account Created Successfully",
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).send({
                  success: false,
                  message: "Error in Backend",
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error in Server",
      });
    });
});

app.post("/login/admin", (req, res) => {
  adminData
    .findOne({ admin_email: req.body.email })
    .then((admin) => {
      if (admin && admin.password === req.body.password) {
        const authToken = jwt.sign(
          { admin_email: admin.admin_email, role: admin.role },
          process.env.secretKey
        );
        return res.status(200).send({
          success: true,
          message: "Logged In Successfully",
          authToken: authToken,
        });
      } else {
        return res.send({ success: false, message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error Occured, Please try again later",
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
  if (user.role === "admin") {
    adminData
      .findOne({ admin_email: user.admin_email })
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
  } else {
    staffData
      .findOne({ employeeId: user.employeeId })
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
        });
      });
  }
});

app.post("/fetch/dashboard/info", async (req, res) => {
  try {
    const { user } = req;
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    if (user.role === "admin") {
      const staffs = await staffData.find({});
      const students = await studentsData.find({});
      const staffActiveCount = staffs.filter((staff) => staff.password);
      const studentActiveCount = students.filter((student) => student.password);
      const libraryRequests = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
      });

      return res.status(200).send({
        success: true,
        message: "Dashboard Info Fetched Successfully",
        dashboardInfo: {
          staffCount: staffs.length,
          studentCount: students.length,
          studentActiveCount: studentActiveCount.length,
          staffActiveCount: staffActiveCount.length,
          libraryRequestsCount: libraryRequests.length,
          leaveRequestsCount: 0,
        },
      });
    } else {
      const staff = await staffData.findOne({
        employeeId: user.employeeId,
      });
      const studentCount = await studentsData.find({
        blockName: staff.blockName,
      });
      const studentActiveCount = studentCount.filter(
        (student) => student.password
      );
      const libraryRequests = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
        studentBlockName: staff.blockName,
      });

      return res.status(200).send({
        success: true,
        message: "Dashboard Info Fetched Successfully",
        dashboardInfo: {
          studentCount: studentCount.length,
          studentActiveCount: studentActiveCount.length,
          libraryRequestsCount: libraryRequests.length,
          leaveRequestsCount: 0,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error Occured while fetching dashboard info",
    });
  }
});

app.post("/fetch/library/requests", async (req, res) => {
  try {
    const user = req.user;
    const libraryRecords = await libraryRequest.find({});
    if (user.role !== "admin") {
      const staff = await staffData.findOne({ employeeId: user.employeeId });
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const records = await libraryRequest.find({
        studentBlockName: staff.blockName,
      });

      if (!staff) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      let libraryRequests;

      if (user.role === "SRO") {
        libraryRequests = await libraryRequest.find({
          studentBlockName: staff.blockName,
          requestDate: { $gte: startOfDay },
          "wardenApproval.status": "approved", // Only fetch requests approved by the warden
          "cancelRequest.status": false,
        });
      } else if (user.role === "librarian") {
        libraryRequests = await libraryRequest.find({
          requestDate: { $gte: startOfDay },
          "wardenApproval.status": "approved", // Only fetch requests approved by the warden
          "SROApproval.status": "approved", // Only fetch requests approved by the SRO
          "cancelRequest.status": false,
        });
      } else {
        libraryRequests = await libraryRequest.find({
          studentBlockName: staff.blockName,
          requestDate: { $gte: startOfDay },
          "cancelRequest.status": false,
        });
      }

      return res.status(200).send({
        success: true,
        message: "Request fetched Successfully",
        libraryRecords: records,
        libraryRequests: libraryRequests,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Request fetched Successfully",
      libraryRecords: libraryRecords,
      libraryRequests: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error Occured while fetching library requests",
    });
  }
});

app.post("/generate/pdf", async (req, res) => {
  try {
    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).send({
        success: false,
        message: "Request ID is required",
      });
    }

    const request = await libraryRequest.findOne({
      requestId: requestId,
    });

    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request not found",
      });
    }

    const filename = request.studentId
      ? `Request-${request.studentId}.pdf`
      : `Request-Unknown.pdf`;

    res.header("Access-Control-Expose-Headers", "Content-Disposition"); // Expose Content-Disposition header

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    const doc = new PDFDocument();

    doc.pipe(res);

    doc
      .fontSize(16)
      .text(`Library Request for Student ID: ${request.studentId}`, {
        align: "center",
      });

    doc
      .moveDown()
      .fontSize(12)
      .text(`Student Name: ${request.studentName}`, {
        align: "left",
      })
      .text(`Academic Year: ${request.studentAcademicYear}`, {
        align: "left",
      })
      .text(`Contact No: ${request.studentContactNo}`, {
        align: "left",
      })
      .text(`Department: ${request.studentDepartment}`, {
        align: "left",
      })
      .text(`Branch: ${request.studentBranchName}`, {
        align: "left",
      })
      .text(`Block Name: ${request.studentBlockName}`, {
        align: "left",
      })
      .text(`Room Number: ${request.studentRoomNumber}`, {
        align: "left",
      })
      .text(
        `Request Date & Time:${new Date(request.requestDate).toLocaleString(
          "en-GB",
          {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }
        )}`,
        {
          align: "left",
        }
      )
      .text(`Request Reason: ${request.description}`, {
        align: "left",
      });

    doc.end();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error Occured while generating pdf",
    });
  }
});

app.post("/add/profile/image", upload, async (req, res) => {
  try {
    const { file, user } = req;

    const staff = await staffData.findOne({ employeeId: user.employeeId });

    if (!staff) {
      return res.status(404).send({
        success: false,
        message: "Student Not Found",
      });
    }

    if (staff.staffImage) {
      const imagePath = path.join(
        __dirname,
        "Uploads/StaffImages",
        staff.staffImage
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

    staff.staffImage = file.filename;

    staff
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

app.post("/update/library/requests", async (req, res) => {
  try {
    const user = req.user;
    const { requestId, status } = req.body;
    const staff = await staffData.findOne({ employeeId: user.employeeId });
    const request = await libraryRequest.findOne({ requestId: requestId });

    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request not found",
      });
    }

    if (!staff) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to update this request",
      });
    }

    if (user.role === "warden") {
      request.wardenApproval.status = status;
      request.wardenApproval.by = staff.employeeId;
      request.wardenApproval.wardenName = staff.name;
      request.wardenApproval.time = Date.now();
    } else if (user.role === "SRO") {
      request.SROApproval.status = status;
      request.SROApproval.by = staff.employeeId;
      request.SROApproval.SROName = staff.name;
      request.SROApproval.time = Date.now();
    } else if (user.role === "librarian") {
      if (status === "in") {
        if (Object.keys(request.in).length === 0) {
          return res.status(400).send({
            success: false,
            message: "Student is already in the library",
          });
        }
        const currentHour = new Date().getHours();

        let resttime;
        if (currentHour < 21) {
          resttime = 30 * 60 * 1000; // 30 minutes in milliseconds
        } else {
          resttime = 15 * 60 * 1000; // 15 minutes in milliseconds
        }
        request.in.by = staff.employeeId;
        request.in.librarianName = staff.name;
        request.in.time = Date.now();

        // Calculate delay time
        const delaytime = Date.now() - request.SROApproval.time;
        if (resttime < delaytime) {
          request.delayTime = delaytime - resttime;
        }
      } else if (status === "out") {
        if (Object.keys(request.out).length === 0) {
          return res.status(400).send({
            success: false,
            message: "Student is already out of the library",
          });
        }
        request.out.by = staff.employeeId;
        request.out.librarianName = staff.name;
        request.out.time = Date.now();
      }
    }

    const ack = await request.save();

    if (ack) {
      return res.status(200).send({
        success: true,
        message: "Library Request Updated Successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Error Occured while updating library request",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/staff/add", (req, res) => {
  const employeeIds = req.body;
  const date = Date.now();

  if (employeeIds.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "Please Enter the Employee Id" });
  }

  const promises = employeeIds.map((employeeId) => {
    return staffData
      .findOne({ employeeId: employeeId })
      .then((staff) => {
        if (!staff) {
          return staffData
            .create({
              employeeId: employeeId,
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
        } else {
          return {
            createdOn: staff.createdOn,
            status: "Duplicate",
          };
        }
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
        message: "Staff Addition Successfully Completed",
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

app.post("/staff/edit", (req, res) => {
  const {
    employeeId,
    previousEmployeeId,
    name,
    email,
    phone,
    role,
    blockName,
    gender,
  } = req.body;

  if (
    !employeeId ||
    !previousEmployeeId ||
    !name ||
    !email ||
    !phone ||
    !role ||
    !gender
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }
  if (role !== "librarian" && !blockName) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }

  if (employeeId !== previousEmployeeId) {
    staffData
      .findOne({ employeeId: employeeId })
      .then((staff) => {
        if (staff) {
          return res
            .status(409)
            .send({ success: false, message: "Employee id already taken!!!" });
        } else {
          updateStaff();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    updateStaff();
  }
  function updateStaff() {
    staffData
      .findOneAndUpdate(
        { employeeId: previousEmployeeId },
        {
          $set: {
            employeeId: employeeId,
            name: name,
            email: email,
            phone: phone,
            role: role,
            blockName: blockName,
            gender: gender,
          },
        }
      )
      .then((staff) => {
        if (!staff) {
          return res
            .status(404)
            .send({ success: false, message: "Staff not found" });
        } else {
          return res
            .status(200)
            .send({ success: true, message: "Staff updated successfully" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.delete("/staff/remove", (req, res) => {
  const { selectedStaffs } = req.body;

  if (selectedStaffs.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide the employee id" });
  }

  staffData
    .deleteMany({ employeeId: { $in: selectedStaffs } })
    .then((ack) => {
      return res.status(200).send({
        success: true,
        message: `Staff Record${ack.deletedCount > 1 ? "s" : ""} Deleted`,
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, message: "Error in Deleting Records" });
    });
});

app.use("/student", Student);

app.post("/staff/get", async (_, res) => {
  try {
    const staffRecords = await staffData.find({});
    return res.status(200).send({ success: true, staffRecords: staffRecords });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
