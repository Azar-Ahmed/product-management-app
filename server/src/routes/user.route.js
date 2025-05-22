import express from "express";
import {
  signUp,
  signIn,
  signOut,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { signUpUserSchema, signInUserSchema } from "../validations/user.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validate(signUpUserSchema), signUp);
router.post("/signin", validate(signInUserSchema), signIn);

router.get("/signout", isAuthenticated, signOut);
router.put("/update", isAuthenticated, updateProfile);
router.put("/change-password", isAuthenticated, changePassword);

router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
