import ActivityModel from '../models/activity.model.js';
import { buildPagination, buildSort } from '../utils/pagination.js';

export async function listActivityLogs(req, res, next) {
  try {
    const pagination = buildPagination(req.query);
    const sort = buildSort('created_at', 'DESC', req.query.sortBy, req.query.sortOrder);
    const filters = {
      project_id: req.query.project_id,
      task_id: req.query.task_id,
      user_id: req.query.user_id,
      action: req.query.action,
    };
    const result = await ActivityModel.list({ filters, pagination, sort });
    res.status(200).json({ success: true, data: result.rows, meta: { total: result.total } });
  } catch (error) {
    next(error);
  }
}
