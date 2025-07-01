// src/validation/payment.schema.ts
import Joi from 'joi';

export const createPaymentSchema = Joi.object({
  vendorId: Joi.string().uuid().required().messages({
    'any.required': 'Vendor ID is required',
    'string.guid': 'Vendor ID must be a valid UUID',
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be greater than zero',
    'any.required': 'Amount is required',
  }),
});
export const approvePaymentSchema = Joi.object({
  generateAccountNumber: Joi.number().required().messages({
    'any.required': 'Generated account number is required',
    'number.base': 'Generated account number must be a number',
  }),
  amount: Joi.number().positive().required().messages({
    'any.required': 'Amount is required',
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be greater than zero',
  }),
});
