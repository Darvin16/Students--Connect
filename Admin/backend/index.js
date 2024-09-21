import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminData from "./Models/AdminData.js";
import staffData from "./Models/StaffData.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

dotenv.config();

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

app.post("/login/staff", (req, res) => {
  console.log(req.body);
});

app.post("/signup/staff", (req, res) => {
  const {
    employeeId,
    name,
    phone,
    email,
    role,
    gender,
    password,
    confirmPassword,
    blockName,
  } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .send({
        success: false,
        message: "Password and Confirm Password doesn't match",
      });
  }

  if (
    !employeeId ||
    !name ||
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
          staff.password
        ) {
          return res
            .status(400)
            .send({
              success: false,
              message: "Account already exists , Please Login",
            });
        }

        staff.name = name;
        staff.phone = phone;
        staff.email = email;
        staff.role = role;
        staff.gender = gender;
        staff.password = password;
        staff.blockName = blockName || null;

        staff
          .save()
          .then(() => {
            return res
              .status(200)
              .send({
                success: true,
                message: "Staff Account Created Successfully",
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
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
      });
  }
});

app.post("/staff/add", (req, res) => {
  if (!req.body.employeeId) {
    return res
      .status(400)
      .send({ success: false, message: "Please Enter the Employee Id" });
  }
  // if (req.body.role !== "librarian" && !req.body.blockName) {
  //   return res
  //     .status(400)
  //     .send({ success: false, message: "Please fill all the fields" });
  // }
  staffData
    .findOne({ employeeId: req.body.employeeId })
    .then((staff) => {
      if (!staff) {
        staffData
          .create({
            employeeId: req.body.employeeId,
          })
          .then(() => {
            return res
              .status(201)
              .send({ success: true, message: "Staff Added Successfully" });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .send({ success: false, message: "Error adding staff" });
          });
      } else {
        return res
          .status(409)
          .send({ success: false, message: "Staff already exist!!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ success: false, message: "Server Error" });
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

app.post("/staff/remove", (req, res) => {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide the employee id" });
  }
  staffData
    .findOneAndDelete({ employeeId: employeeId })
    .then((staff) => {
      if (!staff) {
        return res
          .status(404)
          .send({ success: false, message: "Staff not found" });
      } else {
        return res
          .status(200)
          .send({ success: false, message: "Staff Removed From Database" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

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
