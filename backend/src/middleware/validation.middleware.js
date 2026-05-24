import { validationResult } from 'express-validator';
import ApiError from '../utils/api-error.js';

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extracted = errors.array().map((err) => ({ field: err.param, message: err.msg }));
    return next(new ApiError(400, 'Request validation failed.', { errors: extracted }));
  }
  return next();
}
