import multer from "multer";
import path from "path";

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

const complaintStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/ComplaintImages");
  },
  filename: (req, file, cb) => {
    cb(null, "Complaint-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("studentImage");

const uploadComplaint = multer({
  storage: complaintStorage,
}).single("photo");

export default upload;
export { uploadComplaint };
