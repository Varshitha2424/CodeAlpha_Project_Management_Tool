import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { authLimiter } from '../middleware/rate-limit.middleware.js';

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  validateRequest,
  authController.register
);

router.post(
  '/login',
  authLimiter,
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
  authController.login
);

router.post('/refresh', authLimiter, authController.refreshToken);
router.post('/logout', authLimiter, authController.logout);

export default router;
