import ProjectModel from '../models/project.model.js';
import ProjectMemberModel from '../models/projectMember.model.js';
import ActivityModel from '../models/activity.model.js';
import { buildPagination, buildSort } from '../utils/pagination.js';
import ApiError from '../utils/api-error.js';

export async function createProject(req, res, next) {
  try {
    const project = await ProjectModel.create({
      ...req.body,
      created_by: req.user.id,
    });
    await ActivityModel.create({
      project_id: project.insertId,
      user_id: req.user.id,
      action: 'project_created',
      metadata: { name: req.body.name },
    });
    res.status(201).json({ message: 'Project created', project: { id: project.insertId, ...req.body } });
  } catch (error) {
    next(error);
  }
}

export async function getProjects(req, res, next) {
  try {
    const pagination = buildPagination(req.query);
    const sort = buildSort('created_at', 'DESC', req.query.sortBy, req.query.sortOrder);
    const filters = {
      team_id: req.query.team_id,
      status: req.query.status,
      visibility: req.query.visibility,
      created_by: req.query.created_by,
    };
    const result = await ProjectModel.list({ filters, pagination, sort });
    res.status(200).json({ success: true, data: result.rows, meta: { total: result.total } });
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }
    await ProjectModel.updateById(req.params.projectId, req.body);
    await ActivityModel.create({
      project_id: req.params.projectId,
      user_id: req.user.id,
      action: 'project_updated',
      metadata: { updates: req.body },
    });
    const updatedProject = await ProjectModel.findById(req.params.projectId);
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }
    await ProjectModel.deleteById(req.params.projectId);
    await ActivityModel.create({
      project_id: req.params.projectId,
      user_id: req.user.id,
      action: 'project_deleted',
      metadata: { name: project.name },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function addProjectMember(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }

    await ProjectMemberModel.addMember(req.params.projectId, req.body.user_id, req.body.role);
    await ActivityModel.create({
      project_id: req.params.projectId,
      user_id: req.user.id,
      action: 'project_member_added',
      metadata: { member_id: req.body.user_id, role: req.body.role },
    });
    res.status(201).json({ success: true, data: req.body });
  } catch (error) {
    next(error);
  }
}

export async function removeProjectMember(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }
    await ProjectMemberModel.removeMember(req.params.projectId, req.params.userId);
    await ActivityModel.create({
      project_id: req.params.projectId,
      user_id: req.user.id,
      action: 'project_member_removed',
      metadata: { member_id: req.params.userId },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listProjectMembers(req, res, next) {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      throw new ApiError(404, 'Project not found.');
    }
    const members = await ProjectMemberModel.findByProject(req.params.projectId);
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
}
