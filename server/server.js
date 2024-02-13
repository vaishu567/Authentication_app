// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
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

// User registration
// app.post("/api/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.status(201).send("User registered successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// User login
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     return res.status(401).send("Invalid password");
//   }
//   const token = jwt.sign({ username: user.username }, "secret");
//   res.send({ token });
// });

// Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }
//   try {
//     const verified = jwt.verify(token, "secret");
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send("Invalid Token");
//   }
// };

// Image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/api/upload", verifyToken, upload.single("image"), (req, res) => {
//   res.status(200).send("Image uploaded successfully");
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
