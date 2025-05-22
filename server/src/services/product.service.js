import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../utils/fileUpload.utils.js";
import CustomError from "../utils/customError.utils.js";

export const getAllProductsService = async () => {
  const products = await Product.find();
  return products;
};

export const addProductService = async (productData, file) => {
  const {
    product_name,
    desc,
    mrp,
    salesPrice,
    colors,
    ratings,
    product_type,
    categories,
    brands,
    totalStock
  } = productData;

  if (!file) throw new CustomError("Product image is required", 400);

  const existingProduct = await Product.findOne({ product_name });
  if (existingProduct) {
    throw new CustomError("Product with this name already exists", 409);
  }

  const { secure_url } = await uploadImage(file);

  const newProduct = await Product.create({
    image: secure_url,
    product_name,
    desc,
    mrp,
    salesPrice,
    colors,
    ratings,
    product_type,
    categories,
    brands,
    totalStock,
  });

  return newProduct;
};

export const updateProductService = async (productId, updateData, file) => {
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new CustomError("Product not found", 404);
  }

  let updatedImage = existingProduct.image;

  if (file) {
    if (existingProduct.image?.public_id) {
      await deleteImage(existingProduct.image.public_id);
    }
    const { secure_url } = await uploadImage(file);
    updatedImage = secure_url;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      image: updatedImage,
      ...updateData,
    },
    { new: true }
  );

  return updatedProduct;
};

export const deleteProductService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  if (product.image?.public_id) {
    await deleteImage(product.image.public_id);
  }

  await Product.findByIdAndDelete(productId);
  return productId;
};

export const getProductDetailsService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }
  return product;
};

export const getFilteredProductsService = async (queryParams) => {
  const {
    keyword = '',
    category,
    product_type,
    brand,
    minPrice,
    maxPrice,
    sort = 'asc',
    page = 1,
    limit = 10,
  } = queryParams;

  const query = {
    $or: [
      { product_name: { $regex: keyword, $options: 'i' } },
      { desc: { $regex: keyword, $options: 'i' } },
    ],
  };

  // Category filter
  if (category) {
    query.categories = category;
  }

  // Product type filter
  if (product_type) {
    query.product_type = product_type;
  }

  // Brand filter
  if (brand) {
    query.brands = brand;
  }

  // Price range filter
  if (minPrice || maxPrice) {
    query.salesPrice = {};
    if (minPrice) query.salesPrice.$gte = Number(minPrice);
    if (maxPrice) query.salesPrice.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOption = { salesPrice: sort === 'desc' ? -1 : 1 };

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  return {
    products,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};
