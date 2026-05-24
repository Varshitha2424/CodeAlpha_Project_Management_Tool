import express from 'express';
import { body, param, query } from 'express-validator';
import * as commentController from '../controllers/comment.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  authMiddleware,
  query('sortBy').optional().isString(),
  query('sortOrder').optional().isIn(['ASC', 'DESC']),
  validateRequest,
  commentController.listComments
);

router.post(
  '/',
  authMiddleware,
  body('body').isString().notEmpty().withMessage('Comment body is required'),
  validateRequest,
  commentController.createComment
);

router.delete(
  '/:commentId',
  authMiddleware,
  param('commentId').isInt().toInt(),
  validateRequest,
  commentController.deleteComment
);

export default router;
