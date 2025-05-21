
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { uploadImage } from "../utils/fileUpload.utils.js";
import generateToken from "../utils/jwt.utils.js";
import CustomError from "../utils/customError.utils.js";

export const registerUser = async ({ name, email, phone, password, profileImage }) => {
  if (!profileImage) throw new CustomError("Profile image is required", 400);

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    const field = existingUser.email === email ? "Email" : "Phone";
    throw new CustomError(`${field} already exists!`, 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { secure_url } = await uploadImage(profileImage);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    profileImage: secure_url,
  });

  const token = generateToken(user._id);
  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new CustomError("Invalid credentials!", 401);
  }
  const token = generateToken(user._id);
  return { user, token };
};

export const logoutUser = async () => {
  return { message: "User logged out successfully" };
};

export const updateUserProfile = async (userId, { name, email, phone, profileImage }) => {
  const user = await User.findById(userId);
  if (!user) throw new CustomError("User not found!", 404);

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  if (profileImage) {
    const { secure_url } = await uploadImage(profileImage);
    user.profileImage = secure_url;
  }

  await user.save();
  return user;
};

export const changeUserPassword = async (userId, oldPassword, newPassword, confirmPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new CustomError("User not found!", 404);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new CustomError("Old password is incorrect!", 400);

  if (newPassword !== confirmPassword) {
    throw new CustomError("New password and confirm password do not match!", 400);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
