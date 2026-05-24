import CommentModel from '../models/comment.model.js';
import ActivityModel from '../models/activity.model.js';
import { buildPagination, buildSort } from '../utils/pagination.js';
import ApiError from '../utils/api-error.js';

export async function listComments(req, res, next) {
  try {
    const pagination = buildPagination(req.query);
    const sort = buildSort('created_at', 'ASC', req.query.sortBy, req.query.sortOrder);
    const result = await CommentModel.findByTask(req.params.taskId, { pagination, sort });
    res.status(200).json({ success: true, data: result.rows, meta: { total: result.total } });
  } catch (error) {
    next(error);
  }
}

export async function createComment(req, res, next) {
  try {
    const comment = await CommentModel.create({
      task_id: req.params.taskId,
      user_id: req.user.id,
      body: req.body.body,
    });
    await ActivityModel.create({
      project_id: req.body.project_id || null,
      task_id: req.params.taskId,
      user_id: req.user.id,
      action: 'comment_added',
      metadata: { comment_id: comment.insertId },
    });
    res.status(201).json({ success: true, data: { id: comment.insertId, task_id: req.params.taskId, body: req.body.body } });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      throw new ApiError(404, 'Comment not found.');
    }
    await CommentModel.deleteById(req.params.commentId);
    await ActivityModel.create({
      project_id: null,
      task_id: comment.task_id,
      user_id: req.user.id,
      action: 'comment_deleted',
      metadata: { comment_id: comment.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
