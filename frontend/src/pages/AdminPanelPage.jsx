import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminPanel from '../components/admin/AdminPanel';
import './AdminPanelPage.css';

const AdminPanelPage = () => {
  return (
    <DashboardLayout>
      <div className="admin-panel-page">
        <AdminPanel />
      </div>
    </DashboardLayout>
  );
};

export default AdminPanelPage;