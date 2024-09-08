import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminData from "./Models/AdminData.js";
import staffData from "./Models/StaffData.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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

app.post("/staff/add", (req, res) => {
  if (
    !req.body.employeeId ||
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.role ||
    !req.body.gender
  ) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }
  if (req.body.role !== "librarian" && !req.body.blockName) {
    return res
      .status(400)
      .send({ success: false, message: "Please fill all the fields" });
  }
  staffData
    .findOne({ employeeId: req.body.employeeId })
    .then((staff) => {
      if (!staff) {
        staffData
          .create({
            employeeId: req.body.employeeId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            blockName: req.body.block_name,
            gender: req.body.gender,
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

app.post("/login/staff", (req, res) => {
  console.log(req.body);
});
app.post("/login/admin", (req, res) => {
  adminData
    .findOne({ admin_email: req.body.email })
    .then((admin) => {
      if (admin && admin.password === req.body.password) {
        return res.status(200).send({
          success: true,
          message: "Logged In Successfully",
          userData: { email: admin.email, role: admin.role },
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

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
