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
router.get("/", getAllProducts);

// Validate product creation
router.post("/add", isAuthenticated, validate(createProductSchema), addProducts);

// Validate product update (allow partial updates)
router.put("/update/:id", isAuthenticated, validate(updateProductSchema), updateProducts);

router.delete("/delete/:id", isAuthenticated, deleteProducts);

// Public Routes
router.get("/filter", getFilterProducts);
router.get("/:id", getProductDetails);

export default router;
