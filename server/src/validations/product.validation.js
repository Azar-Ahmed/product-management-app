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
  totalStock: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  product_name: Joi.string().min(3).optional(),
  desc: Joi.string().optional(),
  mrp: Joi.number().positive().optional(),
  salesPrice: Joi.number().positive().optional(),
  colors: Joi.string().optional(),
  ratings: Joi.number().min(0).max(5).optional(),
  product_type: Joi.string().optional(),
  categories: Joi.string().required(),
  brands: Joi.string().optional(),
  totalStock: Joi.number().optional(),
}).min(1); 
