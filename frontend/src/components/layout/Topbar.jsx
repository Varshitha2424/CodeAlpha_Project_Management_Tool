import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="topbar-user">
        <span>User</span>
      </div>
    </header>
  );
};

export default Topbar;