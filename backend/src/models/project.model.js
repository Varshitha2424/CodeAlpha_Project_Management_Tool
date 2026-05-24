import db from '../services/db.service.js';

const ProjectModel = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO projects (team_id, name, slug, description, status, visibility, created_by, start_date, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.team_id,
        data.name,
        data.slug,
        data.description || null,
        data.status || 'active',
        data.visibility || 'private',
        data.created_by,
        data.start_date || null,
        data.due_date || null
      ]
    );
    return result;
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM projects WHERE id = ? AND deleted_at IS NULL`, [id]);
    return rows[0];
  },

  async updateById(id, fields) {
    const setClause = Object.keys(fields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    values.push(id);
    const [result] = await db.execute(
      `UPDATE projects SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      values
    );
    return result;
  },

  async deleteById(id) {
    const [result] = await db.execute(
      `UPDATE projects SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
    return result;
  },

  async list({ filters = {}, pagination = {}, sort = {} }) {
    const clauses = ['deleted_at IS NULL'];
    const params = [];

    if (filters.team_id) {
      clauses.push('team_id = ?');
      params.push(filters.team_id);
    }
    if (filters.status) {
      clauses.push('status = ?');
      params.push(filters.status);
    }
    if (filters.visibility) {
      clauses.push('visibility = ?');
      params.push(filters.visibility);
    }
    if (filters.created_by) {
      clauses.push('created_by = ?');
      params.push(filters.created_by);
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const query = `SELECT * FROM projects ${whereClause} ORDER BY ${sort.orderBy} ${sort.direction} LIMIT ? OFFSET ?`;
    params.push(pagination.limit, pagination.offset);
    const [rows] = await db.execute(query, params);

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(1) as total FROM projects ${whereClause}`,
      params.slice(0, params.length - 2)
    );

    return { rows, total };
  },
};

export default ProjectModel;
