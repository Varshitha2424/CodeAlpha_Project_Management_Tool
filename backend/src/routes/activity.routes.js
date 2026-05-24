import express from 'express';
import { query } from 'express-validator';
import * as activityController from '../controllers/activity.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  query('project_id').optional().isInt().toInt(),
  query('task_id').optional().isInt().toInt(),
  query('user_id').optional().isInt().toInt(),
  validateRequest,
  activityController.listActivityLogs
);

export default router;
