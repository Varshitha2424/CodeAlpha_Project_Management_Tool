import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import UserProfile from '../components/profile/UserProfile';
import './UserProfilePage.css';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Admin',
  avatar: 'https://via.placeholder.com/150',
};

const UserProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="user-profile-page">
        <h1>User Profile</h1>
        <UserProfile user={user} />
      </div>
    </DashboardLayout>
  );
};

export default UserProfilePage;