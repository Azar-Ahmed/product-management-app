import Joi from 'joi';

export const signUpUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Phone number must contain only digits and be 10 to 15 characters long",
    })
    .required(),
});

export const signInUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
