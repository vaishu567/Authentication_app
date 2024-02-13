// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
app.use("/images", express.static(path.join(__dirname, "/images")));

// Image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/api/upload",
  protect,
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send("Error uploading image");
    }
    res.status(200).send("Image uploaded successfully");
  })
);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
