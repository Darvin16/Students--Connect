import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentsData from "./Models/StudentsData.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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
})

app.post("/signup", (req, res) => {
    studentsData.findOne({ email: req.body.email }).then(student => {
        if (student) {
            return res.send({ success: false, message: "Student already exists, Please Login" });
        } else {
            const newStudent = new studentsData({
                email:req.body.email,
                studentName:req.body.studentName,
                password:req.body.password,
            })

            newStudent.save().then(ack => {
                if (ack) {
                    return res.send({ success: true, message: "Student Added Successfully" });
                } else {
                    return res.send({ success: false, message: "Failed to add student" });
                }
            }).catch(err => {
                return res.send({ success: false, message: "Failed to add student Error Occured" });
            })
            }
    }).catch(err => {
        console.log(err);
    })
})

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
