const express = require("express");
const userModel = require("../model/User");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

// uploadImagesController

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

// const uploadImagesController = asyncHandler(async (req, res) => {
//   upload.single("image"),
//     (req, res) => {
//       res.status(200).send("Image uploaded successfully");
//     };
// });

const uploadImagesController = asyncHandler(async (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send("Error uploading image");
    }
    res.status(200).send("Image uploaded successfully");
  });
});

module.exports = uploadImagesController;
