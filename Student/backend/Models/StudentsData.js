import mongoose from "mongoose";

const studentsDataSchema = new mongoose.Schema({
    email: String,
    studentName: String,
    password:String,
})

const studentsData = mongoose.model("studentsData", studentsDataSchema);

export default studentsData;