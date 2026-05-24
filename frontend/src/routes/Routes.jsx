import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AdminPanel from '../pages/AdminPanel';
import ProjectDashboard from '../pages/ProjectDashboard';
import UserProfilePage from '../pages/UserProfilePage';
import AdminPanelPage from '../pages/AdminPanelPage';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPanelPage />
          </ProtectedRoute>
        }
      />
      <Route path="/projects" element={<ProjectDashboard />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;