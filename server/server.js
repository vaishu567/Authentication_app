// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const multer = require("multer");
const { protect } = require("./middleware/authMiddleware");
const Post = require("./model/Post");
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/user", userRoute);

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    const filename = file.name + "_" + Date.now();

    cb(null, filename + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/user/api/upload", upload.single("file"), async (req, res) => {
  res.status(200).json("Image uploaded successfully");
  console.log(req.file);
  await Post.create({ image: req.file.filename })
    .then((res) => {
      console.log("post created successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/getimages", async (req, res) => {
  const data = await Post.find();
  try {
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
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
