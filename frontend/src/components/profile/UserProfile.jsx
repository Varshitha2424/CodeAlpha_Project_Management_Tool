import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="user-profile-header">
        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
        <h2>{user.name}</h2>
      </div>
      <div className="user-profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;