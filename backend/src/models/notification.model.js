import db from '../services/db.service.js';

const NotificationModel = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO notifications (recipient_id, actor_id, type, payload, is_read) VALUES (?, ?, ?, ?, FALSE)`,
      [data.recipient_id, data.actor_id, data.type, JSON.stringify(data.payload)]
    );
    return result;
  },

  async list({ filters = {}, pagination = {}, sort = {} }) {
    const clauses = ['n.deleted_at IS NULL'];
    const params = [];

    if (filters.recipient_id) {
      clauses.push('n.recipient_id = ?');
      params.push(filters.recipient_id);
    }
    if (filters.is_read !== undefined) {
      clauses.push('n.is_read = ?');
      params.push(filters.is_read ? 1 : 0);
    }
    if (filters.type) {
      clauses.push('n.type = ?');
      params.push(filters.type);
    }

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const query = `SELECT n.*, u.first_name AS actor_first_name, u.last_name AS actor_last_name FROM notifications n LEFT JOIN users u ON n.actor_id = u.id ${whereClause} ORDER BY ${sort.orderBy} ${sort.direction} LIMIT ? OFFSET ?`;
    params.push(pagination.limit, pagination.offset);
    const [rows] = await db.execute(query, params);

    const [countRows] = await db.execute(`SELECT COUNT(1) AS total FROM notifications n ${whereClause}`, params.slice(0, params.length - 2));
    return { rows, total: countRows[0].total };
  },

  async markAsRead(id) {
    const [result] = await db.execute(`UPDATE notifications SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`, [id]);
    return result;
  },

  async markAllRead(recipientId) {
    const [result] = await db.execute(`UPDATE notifications SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE recipient_id = ? AND deleted_at IS NULL`, [recipientId]);
    return result;
  },
};

export default NotificationModel;
