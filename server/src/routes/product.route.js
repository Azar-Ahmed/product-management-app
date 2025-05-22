import express from "express";
import {
  getAllProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  getFilterProducts,
  getProductDetails,
} from "../controllers/product.controller.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware.js";
import { createProductSchema, updateProductSchema } from "../validations/product.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

// Admin Routes
router.post("/add",  isAuthenticated, isAuthorized, validate(createProductSchema), addProducts);
router.put("/update/:id", isAuthenticated, isAuthorized, validate(updateProductSchema), updateProducts);
router.delete("/delete/:id", isAuthenticated, isAuthorized, deleteProducts);

// Public Routes
router.get("/", getAllProducts);
router.get("/filter", getFilterProducts);
router.get("/:id", getProductDetails);

export default router;
