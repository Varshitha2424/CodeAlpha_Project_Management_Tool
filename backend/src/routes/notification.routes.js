import express from 'express';
import { param, query } from 'express-validator';
import * as notificationController from '../controllers/notification.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  query('is_read').optional().isIn(['true', 'false']),
  query('type').optional().isString(),
  validateRequest,
  notificationController.listNotifications
);

router.patch(
  '/:notificationId/read',
  authMiddleware,
  param('notificationId').isInt().toInt(),
  validateRequest,
  notificationController.markNotificationRead
);

router.patch('/read-all', authMiddleware, notificationController.markAllNotificationsRead);

export default router;
