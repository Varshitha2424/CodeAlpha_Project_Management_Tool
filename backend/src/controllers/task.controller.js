import TaskModel from '../models/task.model.js';
import ActivityModel from '../models/activity.model.js';
import { buildPagination, buildSort } from '../utils/pagination.js';
import ApiError from '../utils/api-error.js';

export async function createTask(req, res, next) {
  try {
    const task = await TaskModel.create({
      ...req.body,
      created_by: req.user.id,
    });
    await ActivityModel.create({
      project_id: req.body.project_id,
      task_id: task.insertId,
      user_id: req.user.id,
      action: 'task_created',
      metadata: { title: req.body.title },
    });
    res.status(201).json({ success: true, data: { id: task.insertId, ...req.body } });
  } catch (error) {
    next(error);
  }
}

export async function getTasks(req, res, next) {
  try {
    const pagination = buildPagination(req.query);
    const sort = buildSort('created_at', 'DESC', req.query.sortBy, req.query.sortOrder);
    const filters = {
      project_id: req.query.project_id,
      assignee_id: req.query.assignee_id,
      status: req.query.status,
      priority: req.query.priority,
      due_before: req.query.due_before,
      due_after: req.query.due_after,
    };
    const result = await TaskModel.list({ filters, pagination, sort });
    res.status(200).json({ success: true, data: result.rows, meta: { total: result.total } });
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      throw new ApiError(404, 'Task not found.');
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      throw new ApiError(404, 'Task not found.');
    }
    await TaskModel.updateById(req.params.taskId, req.body);
    await ActivityModel.create({
      project_id: task.project_id,
      task_id: task.id,
      user_id: req.user.id,
      action: 'task_updated',
      metadata: { updates: req.body },
    });
    const updatedTask = await TaskModel.findById(req.params.taskId);
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      throw new ApiError(404, 'Task not found.');
    }
    await TaskModel.deleteById(req.params.taskId);
    await ActivityModel.create({
      project_id: task.project_id,
      task_id: task.id,
      user_id: req.user.id,
      action: 'task_deleted',
      metadata: { title: task.title },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function changeTaskStatus(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      throw new ApiError(404, 'Task not found.');
    }
    await TaskModel.updateById(req.params.taskId, { status: req.body.status });
    await ActivityModel.create({
      project_id: task.project_id,
      task_id: task.id,
      user_id: req.user.id,
      action: 'task_status_changed',
      metadata: { old_status: task.status, new_status: req.body.status },
    });
    const updatedTask = await TaskModel.findById(req.params.taskId);
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
}

export async function assignTask(req, res, next) {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      throw new ApiError(404, 'Task not found.');
    }
    await TaskModel.updateById(req.params.taskId, { assignee_id: req.body.assignee_id });
    await ActivityModel.create({
      project_id: task.project_id,
      task_id: task.id,
      user_id: req.user.id,
      action: 'task_assigned',
      metadata: { assignee_id: req.body.assignee_id },
    });
    const updatedTask = await TaskModel.findById(req.params.taskId);
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
}
