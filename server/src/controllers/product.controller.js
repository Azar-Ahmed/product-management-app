import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {
  getAllProductsService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductDetailsService,
  getFilteredProductsService,
} from '../services/product.service.js';

// @desc    Get all products
// @route   GET /api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const data = await getAllProductsService();
  res.status(200).json(data);
});

// @desc    Add a new product
// @route   POST /api/products
export const addProducts = asyncHandler(async (req, res) => {
  const data = await addProductService(req.body, req.files?.image);
  res.status(201).json({ product: data });
});

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProducts = asyncHandler(async (req, res) => {
  const data = await updateProductService(
    req.params.id,
    req.body,
    req.files?.image
  );
  res.status(200).json({ product: data });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProducts = asyncHandler(async (req, res) => {
  const data = await deleteProductService(req.params.id);
  res.status(200).json(data);
});

// @desc    Get single product details
// @route   GET /api/products/:id
export const getProductDetails = asyncHandler(async (req, res) => {
  const data = await getProductDetailsService(req.params.id);
  res.status(200).json(data);
});

// @desc    Get filtered products
// @route   GET /api/products/filter
export const getFilterProducts = asyncHandler(async (req, res) => {
  const data = await getFilteredProductsService(req.query);
  res.status(200).json(data);
});
