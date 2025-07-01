import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.base': 'First name must be a string',
    'any.required': 'First name is required',
  }),

  lastName: Joi.string().trim().required().messages({
    'string.base': 'Last name must be a string',
    'any.required': 'Last name is required',
  }),

  email: Joi.string().email().trim().required().messages({
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),

  phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    'string.pattern.base': 'Phone number must be between 10 and 15 digits',
    'any.required': 'Phone number is required',
  }),

  address: Joi.string().trim().required().messages({
    'string.base': 'Address must be a string',
    'any.required': 'Address is required',
  }),

  role: Joi.string().valid('USER', 'VENDOR').optional().messages({
    'any.only': 'Role must be either User or Vendor',
  }),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
  role: Joi.string().valid('User', 'Vendor').optional(),
});
