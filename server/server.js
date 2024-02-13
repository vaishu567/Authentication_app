// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const multer = require("multer");
const { protect } = require("./middleware/authMiddleware");
// const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;
// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/user", userRoute);

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/user/api/upload", protect, upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).json("Image uploaded successfully");
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(__dirname, "images")); // Corrected destination path
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use original filename
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/user/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("Image uploaded successfully");
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
