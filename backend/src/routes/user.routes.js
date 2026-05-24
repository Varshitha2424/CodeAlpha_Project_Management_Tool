import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, userController.getProfile);
router.patch(
  '/me',
  authMiddleware,
  body('first_name').optional().isString().trim(),
  body('last_name').optional().isString().trim(),
  body('avatar_url').optional().isURL().withMessage('Avatar must be a valid URL'),
  validateRequest,
  userController.updateProfile
);

router.get('/', authMiddleware, roleMiddleware('admin'), userController.listUsers);

export default router;
