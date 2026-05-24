import db from '../services/db.service.js';

const USER_COLUMNS = ['id', 'email', 'password_hash', 'first_name', 'last_name', 'role', 'avatar_url', 'status', 'created_at', 'updated_at'];

const UserModel = {
  async create(user) {
    const params = [user.email, user.password_hash, user.first_name, user.last_name, user.role];
    const [result] = await db.execute(
      `INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)`,
      params
    );
    return result;
  },

  async findByEmail(email) {
    const [rows] = await db.execute(`SELECT ${USER_COLUMNS.join(', ')} FROM users WHERE email = ? AND deleted_at IS NULL`, [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT ${USER_COLUMNS.join(', ')} FROM users WHERE id = ? AND deleted_at IS NULL`, [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.execute(`SELECT ${USER_COLUMNS.join(', ')} FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC`);
    return rows;
  },

  async updateById(id, fields) {
    const setClause = Object.keys(fields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    if (!setClause) return null;
    values.push(id);
    const [result] = await db.execute(`UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`, values);
    return result;
  },
};

export default UserModel;
