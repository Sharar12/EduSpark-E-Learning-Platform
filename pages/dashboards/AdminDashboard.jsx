import React from 'react';

import './AdminDashboard.css';



const AdminDashboard = ({ user, onNavigateToManageUsers, onNavigateToManageCourses }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and management tools.</p>
      </header>
      <div className="dashboard-content">
        <section className="dashboard-section stats-grid">
            <div className="stat-card">
                <h3>Total Users</h3>
                <p>1,250</p>
            </div>
             <div className="stat-card">
                <h3>Total Courses</h3>
                <p>150</p>
            </div>
             <div className="stat-card">
                <h3>Active Students</h3>
                <p>830</p>
            </div>
             <div className="stat-card">
                <h3>Revenue (Month)</h3>
                <p>$15,400</p>
            </div>
        </section>
        <section className="dashboard-section">
            <h2>Management Actions</h2>
            <div className="management-actions">
                <button onClick={onNavigateToManageUsers}>Manage Users</button>
                <button onClick={onNavigateToManageCourses}>Manage Courses</button>
                <button>View Reports</button>
                <button>Platform Settings</button>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;