import Joi from 'joi';

export const createProductSchema = Joi.object({
  product_name: Joi.string().min(3).required(),
  desc: Joi.string().optional(),
  mrp: Joi.number().positive().required(),
  salesPrice: Joi.number().positive().required(),
  colors: Joi.string().optional(),
  ratings: Joi.number().min(0).max(5).optional(),
  product_type: Joi.string().required(),
  categories: Joi.string().required(),
  brands: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  product_name: Joi.string().min(3).optional(),
  desc: Joi.string().optional(),
  mrp: Joi.number().positive().optional(),
  salesPrice: Joi.number().positive().optional(),
  colors: Joi.array().items(Joi.string()).optional(),
  ratings: Joi.number().min(0).max(5).optional(),
  product_type: Joi.string().optional(),
  categories: Joi.array().items(Joi.string()).optional(),
  brands: Joi.string().optional(),
}).min(1); // Require at least one field for update
