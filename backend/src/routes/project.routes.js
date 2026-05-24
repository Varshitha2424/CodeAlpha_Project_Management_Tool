import express from 'express';
import { body, param, query } from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  query('team_id').optional().isInt().toInt(),
  query('status').optional().isIn(['active', 'archived']),
  query('visibility').optional().isIn(['private', 'team', 'public']),
  validateRequest,
  projectController.getProjects
);

router.post(
  '/',
  authMiddleware,
  body('team_id').isInt().withMessage('team_id is required'),
  body('name').isString().notEmpty().withMessage('name is required'),
  body('slug').isString().notEmpty().withMessage('slug is required'),
  body('status').optional().isIn(['active', 'archived']),
  body('visibility').optional().isIn(['private', 'team', 'public']),
  validateRequest,
  projectController.createProject
);

router.get(
  '/:projectId',
  authMiddleware,
  param('projectId').isInt().toInt(),
  validateRequest,
  projectController.getProjectById
);

router.patch(
  '/:projectId',
  authMiddleware,
  param('projectId').isInt().toInt(),
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('status').optional().isIn(['active', 'archived']),
  body('visibility').optional().isIn(['private', 'team', 'public']),
  validateRequest,
  projectController.updateProject
);

router.delete(
  '/:projectId',
  authMiddleware,
  param('projectId').isInt().toInt(),
  validateRequest,
  projectController.deleteProject
);

router.get(
  '/:projectId/members',
  authMiddleware,
  param('projectId').isInt().toInt(),
  validateRequest,
  projectController.listProjectMembers
);

router.post(
  '/:projectId/members',
  authMiddleware,
  param('projectId').isInt().toInt(),
  body('user_id').isInt().withMessage('user_id is required'),
  body('role').optional().isIn(['admin', 'manager', 'member']),
  validateRequest,
  projectController.addProjectMember
);

router.delete(
  '/:projectId/members/:userId',
  authMiddleware,
  param('projectId').isInt().toInt(),
  param('userId').isInt().toInt(),
  validateRequest,
  projectController.removeProjectMember
);

export default router;
