import db from '../services/db.service.js';

const TokenModel = {
  async storeRefreshToken(userId, token) {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
    const [result] = await db.execute(
      `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
      [userId, token, expiresAt]
    );
    return result;
  },

  async findRefreshToken(token) {
    const [rows] = await db.execute(
      `SELECT * FROM refresh_tokens WHERE token = ? AND deleted_at IS NULL`,
      [token]
    );
    return rows[0];
  },

  async revokeToken(token) {
    const [result] = await db.execute(
      `UPDATE refresh_tokens SET revoked_at = CURRENT_TIMESTAMP WHERE token = ? AND deleted_at IS NULL`,
      [token]
    );
    return result;
  },
};

export default TokenModel;
