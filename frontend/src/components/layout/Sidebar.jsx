import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Project Tool</div>
      <nav className="sidebar-nav">
        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Tasks</li>
          <li>Profile</li>
          <li>Admin</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;