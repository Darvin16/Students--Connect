import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/StudentConnect")
  .then(() => {
    console.log("Database connected successfully");
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
  console.log(req.body);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
