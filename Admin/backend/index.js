import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminData from "./Models/AdminData.js";

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
          password:"123"
        })
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
app.post("/login/admin", (req, res) => {
  adminData.findOne({ admin_email: req.body.email }).then((admin) => {
    if (admin && admin.password === req.body.password) {
      return res.status(200).send({ success: true, message: "Logged In Successfully" });
     } else {
      return res.status(402).send({ success: false, message: "Invalid Credentials" });
    }
  }).catch(err => {
    console.log(err);
    return res.status(500).send({ success: false, message:"Error Occured, Please try again later" });
  })
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
