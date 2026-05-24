import express from 'express';
import { body, param, query } from 'express-validator';
import * as taskController from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  query('project_id').optional().isInt().toInt(),
  query('assignee_id').optional().isInt().toInt(),
  query('status').optional().isIn(['todo', 'in_progress', 'review', 'completed']),
  query('priority').optional().isIn(['low', 'medium', 'high']),
  validateRequest,
  taskController.getTasks
);

router.post(
  '/',
  authMiddleware,
  body('project_id').isInt().withMessage('project_id is required'),
  body('title').isString().notEmpty().withMessage('title is required'),
  body('status').optional().isIn(['todo', 'in_progress', 'review', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('assignee_id').optional().isInt(),
  validateRequest,
  taskController.createTask
);

router.get(
  '/:taskId',
  authMiddleware,
  param('taskId').isInt().toInt(),
  validateRequest,
  taskController.getTaskById
);

router.patch(
  '/:taskId',
  authMiddleware,
  param('taskId').isInt().toInt(),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'in_progress', 'review', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('due_date').optional().isISO8601(),
  body('assignee_id').optional().isInt(),
  validateRequest,
  taskController.updateTask
);

router.delete(
  '/:taskId',
  authMiddleware,
  param('taskId').isInt().toInt(),
  validateRequest,
  taskController.deleteTask
);

router.patch(
  '/:taskId/status',
  authMiddleware,
  param('taskId').isInt().toInt(),
  body('status').isIn(['todo', 'in_progress', 'review', 'completed']),
  validateRequest,
  taskController.changeTaskStatus
);

router.patch(
  '/:taskId/assign',
  authMiddleware,
  param('taskId').isInt().toInt(),
  body('assignee_id').isInt().withMessage('assignee_id is required'),
  validateRequest,
  taskController.assignTask
);

export default router;
