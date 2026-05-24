import db from '../services/db.service.js';

const CommentModel = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO task_comments (task_id, user_id, body) VALUES (?, ?, ?)`,
      [data.task_id, data.user_id, data.body]
    );
    return result;
  },

  async findByTask(taskId, { pagination = {}, sort = {} } = {}) {
    const [rows] = await db.execute(
      `SELECT c.*, u.first_name, u.last_name, u.avatar_url FROM task_comments c JOIN users u ON c.user_id = u.id WHERE c.task_id = ? AND c.deleted_at IS NULL ORDER BY ${sort.orderBy} ${sort.direction} LIMIT ? OFFSET ?`,
      [taskId, pagination.limit, pagination.offset]
    );
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(1) AS total FROM task_comments c WHERE c.task_id = ? AND c.deleted_at IS NULL`,
      [taskId]
    );
    return { rows, total };
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM task_comments WHERE id = ? AND deleted_at IS NULL`, [id]);
    return rows[0];
  },

  async deleteById(id) {
    const [result] = await db.execute(
      `UPDATE task_comments SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
    return result;
  },
};

export default CommentModel;
