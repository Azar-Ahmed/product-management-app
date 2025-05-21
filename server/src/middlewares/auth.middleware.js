import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import CustomError from "../utils/customError.utils.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from cookies or Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("No token provided", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new CustomError("User not found", 401);
  }

  req.user = user;
  next();
});

export const isAuthorized = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  throw new CustomError("Access denied - Admin only", 403);
};
