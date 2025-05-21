import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  changeUserPassword,
} from "../services/user.service.js";

// @desc    User Registration
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const file = req.files?.profileImage;

  const { user, token } = await registerUser({ name, email, phone, password, profileImage: file });

  res.status(201).json({
    message: "User registered successfully",
    token,
    user,
  });
});

// @desc    User Login
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUser({ email, password });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({
      message: "User signed in successfully",
      user,
    });
});

// @desc    User Logout
export const signOut = asyncHandler(async (req, res) => {
  await logoutUser();
  res.clearCookie("token").json({ message: "User logged out successfully" });
});

// @desc    Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const file = req.files?.profileImage;

  const user = await updateUserProfile(req.user.id, { name, email, phone, profileImage: file });

  res.status(200).json({
    message: "Profile updated successfully",
    user,
  });
});

// @desc    Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  await changeUserPassword(req.user.id, oldPassword, newPassword, confirmPassword);

  res.status(200).json({ message: "Password updated successfully" });
});
