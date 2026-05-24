import db from '../services/db.service.js';

const ActivityModel = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO activity_logs (project_id, task_id, user_id, action, metadata) VALUES (?, ?, ?, ?, ?)`,
      [data.project_id || null, data.task_id || null, data.user_id, data.action, JSON.stringify(data.metadata || {})]
    );
    return result;
  },

  async list({ filters = {}, pagination = {}, sort = {} }) {
    const clauses = ['deleted_at IS NULL'];
    const params = [];

    if (filters.project_id) {
      clauses.push('project_id = ?');
      params.push(filters.project_id);
    }
    if (filters.task_id) {
      clauses.push('task_id = ?');
      params.push(filters.task_id);
    }
    if (filters.user_id) {
      clauses.push('user_id = ?');
      params.push(filters.user_id);
    }
    if (filters.action) {
      clauses.push('action LIKE ?');
      params.push(`%${filters.action}%`);
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const query = `SELECT * FROM activity_logs ${whereClause} ORDER BY ${sort.orderBy} ${sort.direction} LIMIT ? OFFSET ?`;
    params.push(pagination.limit, pagination.offset);
    const [rows] = await db.execute(query, params);

    const [countRows] = await db.execute(`SELECT COUNT(1) AS total FROM activity_logs ${whereClause}`, params.slice(0, params.length - 2));
    return { rows, total: countRows[0].total };
  },
};

export default ActivityModel;
