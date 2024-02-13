const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

// Middleware to verify JWT
const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
});

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       // console.log(token);
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.log(error.message);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, token not found");
//   }
// });

module.exports = { protect };
