import db from '../services/db.service.js';

const TaskModel = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO tasks (project_id, title, description, status, priority, due_date, assignee_id, created_by, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.project_id,
        data.title,
        data.description || null,
        data.status || 'todo',
        data.priority || 'medium',
        data.due_date || null,
        data.assignee_id || null,
        data.created_by,
        data.order_index || 0
      ]
    );
    return result;
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL`, [id]);
    return rows[0];
  },

  async updateById(id, fields) {
    const setClause = Object.keys(fields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    values.push(id);
    const [result] = await db.execute(
      `UPDATE tasks SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      values
    );
    return result;
  },

  async deleteById(id) {
    const [result] = await db.execute(
      `UPDATE tasks SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
    return result;
  },

  async list({ filters = {}, pagination = {}, sort = {} }) {
    const clauses = ['t.deleted_at IS NULL'];
    const params = [];

    if (filters.project_id) {
      clauses.push('t.project_id = ?');
      params.push(filters.project_id);
    }
    if (filters.assignee_id) {
      clauses.push('t.assignee_id = ?');
      params.push(filters.assignee_id);
    }
    if (filters.status) {
      clauses.push('t.status = ?');
      params.push(filters.status);
    }
    if (filters.priority) {
      clauses.push('t.priority = ?');
      params.push(filters.priority);
    }
    if (filters.due_before) {
      clauses.push('t.due_date <= ?');
      params.push(filters.due_before);
    }
    if (filters.due_after) {
      clauses.push('t.due_date >= ?');
      params.push(filters.due_after);
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const query = `SELECT t.*, u.first_name AS assignee_first_name, u.last_name AS assignee_last_name, u.avatar_url AS assignee_avatar FROM tasks t LEFT JOIN users u ON t.assignee_id = u.id ${whereClause} ORDER BY ${sort.orderBy} ${sort.direction} LIMIT ? OFFSET ?`;
    params.push(pagination.limit, pagination.offset);
    const [rows] = await db.execute(query, params);

    const countQuery = `SELECT COUNT(1) as total FROM tasks t ${whereClause}`;
    const [countRows] = await db.execute(countQuery, params.slice(0, params.length - 2));

    return { rows, total: countRows[0].total };
  },
};

export default TaskModel;
