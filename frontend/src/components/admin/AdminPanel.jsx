import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>Manage users, projects, and tasks from here.</p>
      <div className="admin-actions">
        <button>Manage Users</button>
        <button>Manage Projects</button>
        <button>Manage Tasks</button>
      </div>
    </div>
  );
};

export default AdminPanel;