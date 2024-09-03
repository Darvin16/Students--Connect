import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("https://localhost:27017/StudentConnect")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", () => {
  console.log("Server is running");
});

app.post("/admin/login", (req, res) => {
    const { login_as, Employee_id, OTP, password } = req.body;
    if (login_as === "admin") {
    }
    if (login_as === "staff") { }
})

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
