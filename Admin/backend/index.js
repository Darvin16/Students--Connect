import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminData from "./Models/AdminData.js";
import staffData from "./Models/StaffData.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Student from "./Routes/Student.js";
import ResetPassword from "./Routes/resetPassword.js";
import libraryRequest from "./Models/LibraryRequest.js";
import studentsData from "./Models/StudentsData.js";
import PDFDocument from "pdfkit";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import leaveRequestFile from "./Routes/leaveRequest.js";
import leaveRequest from "./Models/LeaveRequest.js";
import latePermission from "./Routes/latePermission.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("Uploads"));

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentImagePath = path.join(
  __dirname,
  "../..",
  "/Student/backend/Uploads"
);

app.use(express.static(studentImagePath));

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

app.post("/signup/staff", multer().none(), (req, res) => {
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

app.use(ResetPassword);

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

app.use(leaveRequestFile);
app.use(latePermission);

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
    const startOfYear = new Date();
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    if (user.role === "admin") {
      const staffs = await staffData.find({});
      const students = await studentsData.find({});
      const staffActiveCount = staffs.filter((staff) => staff.password);
      const studentActiveCount = students.filter((student) => student.password);
      const libraryRequests = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
      });
      const leaveRequests = await leaveRequest.find({
        requestDate: { $gte: startOfYear },
        "cancelRequest.status": false,
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
          leaveRequestsCount: leaveRequests.length,
        },
      });
    } else if (user.role === "librarian") {
      const libraryRequests = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
        "wardenApproval.status": "approved",
        "SROApproval.status": "approved",
        "cancelRequest.status": false,
      });
      const entryStatus = libraryRequests.filter((request) => request.in.by);
      const exitStatus = libraryRequests.filter((request) => request.out.by);
      const totalVisits = libraryRequests.filter(
        (request) => request.in.by && request.out.by
      );
      const pendingStatus = libraryRequests.filter((request) => !request.in.by);
      const delayedLibraryEntry = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
        wardenApproval: { $exists: true },
        SROApproval: { $exists: true },
        delayTime: { $exists: true },
      });

      const averageDelay = await libraryRequest.aggregate([
        {
          $match: {
            delayTime: { $exists: true },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$requestDate" } },
              week: { $week: { $toDate: "$requestDate" } },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            week: "$_id.week",
            year: "$_id.year",
            count: 1,
            _id: 1,
          },
        },
        {
          $sort: { year: 1, week: 1 },
        },
      ]);

      const avgDelayCount =
        averageDelay.reduce((acc, record) => {
          return (acc += record.count);
        }, 0) / averageDelay.length;

      console.log({
        libraryRequestsCount: libraryRequests.length,
        entryStatus: entryStatus.length,
        exitStatus: exitStatus.length,
        totalVisits: totalVisits.length,
        pendingStatus: pendingStatus.length,
        delayedLibraryEntry: delayedLibraryEntry.length,
        averageDelay: avgDelayCount,
      });

      return res.status(200).send({
        success: true,
        message: "Dashboard Info Fetched Successfully",
        dashboardInfo: {
          libraryRequestsCount: libraryRequests.length,
          entryStatus: entryStatus.length,
          exitStatus: exitStatus.length,
          totalVisits: totalVisits.length,
          pendingStatus: pendingStatus.length,
          delayedLibraryEntry: delayedLibraryEntry.length,
          averageDelay: avgDelayCount,
        },
      });
    } else if (user.role === "SRO") {
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
        wardenApproval: { $exists: true },
        "cancelRequest.status": false,
      });
      const approvedLibraryRequests = libraryRequests.filter(
        (request) => request.SROApproval.status === "approved"
      );
      const rejectedLibraryRequests = libraryRequests.filter(
        (request) => request.SROApproval.status === "rejected"
      );
      const pendingLibraryRequests = libraryRequests.filter(
        (request) => !request.SROApproval.status
      );
      const delayedLibraryEntry = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
        studentBlockName: staff.blockName,
        wardenApproval: { $exists: true },
        SROApproval: { $exists: true },
        delayTime: { $exists: true },
      });
      const averageDelay = await libraryRequest.aggregate([
        {
          $match: {
            delayTime: { $exists: true },
            studentBlockName: staff.blockName,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$requestDate" } },
              week: { $week: { $toDate: "$requestDate" } },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            week: "$_id.week",
            year: "$_id.year",
            count: 1,
            _id: 1,
          },
        },
        {
          $sort: { year: 1, week: 1 },
        },
      ]);

      const avgDelayCount =
        averageDelay.reduce((acc, record) => {
          return (acc += record.count);
        }, 0) / averageDelay.length;

      const leaveRequests = await leaveRequest.find({
        studentBlockName: staff.blockName,
        wardenApproval: { $exists: true },
        requestDate: { $gte: startOfYear },
        "cancelRequest.status": false,
      });
      const unattendedLeaveRequests = leaveRequests.filter(
        (request) => request.from < startOfDay
      );
      const leaveRequestsInsights = await leaveRequest.aggregate([
        {
          $match: {
            studentBlockName: staff.blockName,
            from: { $gte: startOfDay },
          },
        },
        {
          $group: {
            _id: "$SROApproval.status",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            approved: {
              $sum: { $cond: [{ $eq: ["$_id", "approved"] }, "$count", 0] },
            },
            rejected: {
              $sum: { $cond: [{ $eq: ["$_id", "rejected"] }, "$count", 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ["$_id", null] }, "$count", 0] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            approved: 1,
            rejected: 1,
            pending: 1,
          },
        },
      ]);

      return res.status(200).send({
        success: true,
        message: "Dashboard Info Fetched Successfully",
        dashboardInfo: {
          studentCount: studentCount.length,
          studentActiveCount: studentActiveCount.length,
          libraryRequestsCount: libraryRequests.length,
          approvedLibraryRequests: approvedLibraryRequests.length,
          rejectedLibraryRequests: rejectedLibraryRequests.length,
          pendingLibraryRequests: pendingLibraryRequests.length,
          delayedLibraryEntry: delayedLibraryEntry.length,
          averageDelay: avgDelayCount,
          leaveRequestsCount: leaveRequests.length,
          approvedLeaveRequests: leaveRequestsInsights[0]?.approved || 0,
          rejectedLeaveRequests:
            leaveRequestsInsights[0]?.rejected || 0 + unattendedLeaveRequests.length || 0,
          pendingLeaveRequests: leaveRequestsInsights[0]?.pending || 0,
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
        "cancelRequest.status": false,
      });
      const approvedLibraryRequests = libraryRequests.filter(
        (request) => request.wardenApproval.status === "approved"
      );
      const rejectedLibraryRequests = libraryRequests.filter(
        (request) => request.wardenApproval.status === "rejected"
      );
      const pendingLibraryRequests = libraryRequests.filter(
        (request) => !request.wardenApproval.status
      );
      const delayedLibraryEntry = await libraryRequest.find({
        requestDate: { $gte: startOfDay },
        studentBlockName: staff.blockName,
        wardenApproval: { $exists: true },
        SROApproval: { $exists: true },
        delayTime: { $exists: true },
      });
      const averageDelay = await libraryRequest.aggregate([
        {
          $match: {
            delayTime: { $exists: true },
            studentBlockName: staff.blockName,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: { $toDate: "$requestDate" } },
              week: { $week: { $toDate: "$requestDate" } },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            week: "$_id.week",
            year: "$_id.year",
            count: 1,
            _id: 1,
          },
        },
        {
          $sort: { year: 1, week: 1 },
        },
      ]);

      const avgDelayCount =
        averageDelay.reduce((acc, record) => {
          return (acc += record.count);
        }, 0) / averageDelay.length;

      const leaveRequests = await leaveRequest.find({
        studentBlockName: staff.blockName,
        requestDate: { $gte: startOfYear },
        "cancelRequest.status": false,
      });
      const unattendedLeaveRequests = leaveRequests.filter(
        (request) => request.from < startOfDay
      );
      const leaveRequestsInsights = await leaveRequest.aggregate([
        {
          $match: {
            studentBlockName: staff.blockName,
            from: { $gte: startOfDay },
          },
        },
        {
          $group: {
            _id: "$wardenApproval.status",
            count: { $sum: 1 },
          },
        },
        {
          $facet: {
            result: [
              {
                $group: {
                  _id: null,
                  approved: {
                    $sum: {
                      $cond: [{ $eq: ["$_id", "approved"] }, "$count", 0],
                    },
                  },
                  rejected: {
                    $sum: {
                      $cond: [{ $eq: ["$_id", "rejected"] }, "$count", 0],
                    },
                  },
                  pending: {
                    $sum: { $cond: [{ $eq: ["$_id", null] }, "$count", 0] },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  approved: 1,
                  rejected: 1,
                  pending: 1,
                },
              },
            ],
            default: [
              {
                $project: {
                  _id: 0,
                  approved: { $literal: 0 },
                  rejected: { $literal: 0 },
                  pending: { $literal: 0 },
                },
              },
            ],
          },
        },
        {
          $project: {
            result: {
              $cond: {
                if: { $gt: [{ $size: "$result" }, 0] },
                then: { $arrayElemAt: ["$result", 0] },
                else: { $arrayElemAt: ["$default", 0] },
              },
            },
          },
        },
      ]);

      return res.status(200).send({
        success: true,
        message: "Dashboard Info Fetched Successfully",
        dashboardInfo: {
          studentCount: studentCount.length,
          studentActiveCount: studentActiveCount.length,
          libraryRequestsCount: libraryRequests.length,
          approvedLibraryRequests: approvedLibraryRequests.length,
          rejectedLibraryRequests: rejectedLibraryRequests.length,
          pendingLibraryRequests: pendingLibraryRequests.length,
          delayedLibraryEntry: delayedLibraryEntry.length,
          averageDelay: avgDelayCount,
          leaveRequestsCount: leaveRequests.length,
          approvedLeaveRequests: leaveRequestsInsights[0]?.approved || 0,
          rejectedLeaveRequests:
            leaveRequestsInsights[0]?.rejected || 0 + unattendedLeaveRequests.length,
          pendingLeaveRequests: leaveRequestsInsights[0]?.pending || 0,
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

      let libraryRequests = [];

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
    const { requestId, type } = req.body;

    if (!requestId) {
      return res.status(400).send({
        success: false,
        message: "Request ID is required",
      });
    }
    if (type === "library") {
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
        .text(`Library Request from Student ID: ${request.studentId}`, {
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
    } else if (type === "leave") {
      const request = await leaveRequest.findOne({ requestId: requestId });

      if (!request) {
        return res.status(404).send("Leave Request Not Found");
      }

      const filename = request.studentId
        ? `Request-${request.studentId}.pdf`
        : `Request-Unknown.pdf`;
      const status =
        request.wardenApproval.status && request.SROApproval.status
          ? request.wardenApproval.status === "approved" &&
            request.SROApproval.status === "approved"
            ? "(Approved)"
            : "(Rejected)"
          : "(Pending)";
      const reason = `On ${new Date(request.requestDate).toLocaleString(
        "en-GB",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}, ${request.studentName} have submitted a leave request for the ${
        request.oneDayLeave
          ? `date of ${new Date(request.from).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`
          : `period of ${new Date(request.from).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} to ${new Date(request.to).toLocaleString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`
      } for the reason "${request.reason}"`;

      const imagePath = path.join(
        __dirname,
        "../../",
        "Student/backend/Uploads/LeaveImages/",
        request.studentImage
      );

      res.header("Access-Control-Expose-Headers", "Content-Disposition");

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

      const doc = new PDFDocument();

      doc.pipe(res);

      doc
        .fontSize(24)
        .text(`Leave Request From ${request.studentId}`, {
          align: "center",
        })
        .fontSize(12)
        .fillColor(
          `${
            status === "(Pending)"
              ? "gray"
              : status === "(Approved)"
              ? "green"
              : "red"
          }`
        )
        .text(status, {
          align: "center",
        });

      if (request.cancelRequest.status) {
        doc
          .fontSize(14)
          .fillColor("red")
          .text(
            `Request has been Cancelled by the Student on ${new Date(
              request.cancelRequest.time
            ).toLocaleString("en-Gb", {
              hour12: true,
            })}`,
            {
              align: "center",
            }
          );
      }

      doc
        .moveDown()
        .fontSize(14)
        .fillColor("black")
        .text(`Name: ${request.studentName}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Student Id: ${request.studentId}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Block: ${request.studentBlockName}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Room no: ${request.studentRoomNumber}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Department: ${request.studentDepartment}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Branch: ${request.studentBranchName}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Academic Year: ${request.studentAcademicYear}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Student Contact No: ${request.studentContactNo}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Parent Contact No: ${request.parentContactNo}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`Reason: ${request.leaveType.replace(/_/g, " ")}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`${reason}`, {
          align: "left",
          indent: 30,
          lineGap: 10,
        })
        .moveDown()
        .moveDown()
        .text(`Warden Status: ${request.wardenApproval.status || "pending"}`, {
          align: "left",
          lineGap: 10,
        })
        .text(`SRO Status: ${request.SROApproval.status || "pending"}`, {
          align: "left",
          lineGap: 10,
        });

      doc.image(imagePath, 400, 125, {
        width: 150,
        height: 150,
      });

      doc.end();
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid request type",
      });
    }
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
    const startOfDay = new Date().setHours(0, 0, 0, 0);

    if (!requestId || !status) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Request" });
    }

    const staff = await staffData.findOne({ employeeId: user.employeeId });

    if (!staff) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to update this request",
      });
    }

    if (requestId === "all") {
      if (staff.role === "warden") {
        const requests = await libraryRequest.updateMany(
          {
            requestDate: { $gte: startOfDay },
            "wardenApproval.status": { $exists: false },
          },
          {
            $set: {
              "wardenApproval.status": status,
              "wardenApproval.time": Date.now(),
              "wardenApproval.by": staff.employeeId,
              "wardenApproval.wardenName": staff.name,
            },
          }
        );
        if (requests.modifiedCount > 0) {
          return res
            .status(200)
            .send({ success: true, message: "Requests Updated Successfully" });
        } else {
          return res
            .status(400)
            .send({ success: false, message: "No Requests to Update" });
        }
      } else if (staff.role === "SRO") {
        const requests = await libraryRequest.updateMany(
          {
            requestDate: { $gte: startOfDay },
            "wardenApproval.status": "approved",
            "SROApproval.status": { $exists: false },
          },
          {
            $set: {
              "SROApproval.status": status,
              "SROApproval.time": Date.now(),
              "SROApproval.by": staff.employeeId,
              "SROApproval.SROName": staff.name,
            },
          }
        );
        if (requests.modifiedCount > 0) {
          return res
            .status(200)
            .send({ success: true, message: "Requests Updated Successfully" });
        } else {
          return res
            .status(400)
            .send({ success: false, message: "No Requests to Update" });
        }
      }
    } else {
      const request = await libraryRequest.findOne({ requestId: requestId });

      if (!request) {
        return res.status(404).send({
          success: false,
          message: "Request not found",
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
          const currentHour = new Date(request.SROApproval.time).getHours();

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
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/staff/add", (req, res) => {
  const employeeIds = req.body;
  const uniqueEmployeeIds = [...new Set(employeeIds)];
  const date = Date.now();

  if (employeeIds.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "Please Enter the Employee Id" });
  }

  const employeeIdsResults = {};

  const promises = uniqueEmployeeIds.map((employeeId) => {
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
              employeeIdsResults[employeeId] = {
                createdOn: date,
                status: "Activated",
              };
            })
            .catch((err) => {
              console.log(err);
              employeeIdsResults[employeeId] = {
                createdOn: date,
                status: "Error",
              };
            });
        } else {
          employeeIdsResults[employeeId] = {
            createdOn: staff.createdOn,
            status: "Duplicate",
          };
        }
      })
      .catch((err) => {
        console.log(err);
        employeeIdsResults[employeeId] = {
          createdOn: date,
          status: "Error",
        };
      });
  });

  Promise.all(promises)
    .then(() => {
      const results = employeeIds.map(
        (employeeId) => employeeIdsResults[employeeId]
      );
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

app.put("/staff/edit", async (req, res) => {
  const { name, email, phone, blockName, gender, address } = req.body;

  if (!name || !email || !phone || !address || !gender) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }
  if (req.user.role !== "librarian" && !blockName) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }
  staffData
    .findOneAndUpdate(
      {
        employeeId: req.user.employeeId,
      },
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          blockName: blockName || null,
          gender: gender,
          address: address,
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

app.delete("/staff/remove", async (req, res) => {
  const { selectedStaffs } = req.body;

  if (selectedStaffs.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide the employee id" });
  }

  try {
    const promises = selectedStaffs.map((id) => {
      return staffData.findOneAndDelete({ employeeId: id });
    });

    const results = await Promise.all(promises);

    const deletedStaffs = results.filter((staff) => staff !== null);

    if (deletedStaffs.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Staff Deleted",
      });
    }

    const imageDeletionPromises = deletedStaffs.map((staff) => {
      if (staff.staffImage) {
        const imagePath = path.join(
          __dirname,
          "Uploads/StaffImages",
          staff.staffImage
        );

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

    const deleteResults = await Promise.all(imageDeletionPromises);

    console.log(deleteResults);

    return res.status(200).send({
      success: true,
      message: `Staff${
        deletedStaffs.length > 1 ? "s" : "F"
      } Deleted Successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
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
