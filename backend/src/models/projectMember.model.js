import db from '../services/db.service.js';

const ProjectMemberModel = {
  async addMember(projectId, userId, role = 'member') {
    const [result] = await db.execute(
      `INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)`,
      [projectId, userId, role]
    );
    return result;
  },

  async removeMember(projectId, userId) {
    const [result] = await db.execute(
      `DELETE FROM project_members WHERE project_id = ? AND user_id = ?`,
      [projectId, userId]
    );
    return result;
  },

  async findByProject(projectId) {
    const [rows] = await db.execute(
      `SELECT pm.*, u.first_name, u.last_name, u.email, u.avatar_url FROM project_members pm JOIN users u ON pm.user_id = u.id WHERE pm.project_id = ? AND pm.deleted_at IS NULL`,
      [projectId]
    );
    return rows;
  },

  async findMember(projectId, userId) {
    const [rows] = await db.execute(
      `SELECT * FROM project_members WHERE project_id = ? AND user_id = ? AND deleted_at IS NULL`,
      [projectId, userId]
    );
    return rows[0];
  },
};

export default ProjectMemberModel;
