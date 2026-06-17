import React, { useState } from 'react';
import { FaFilm, FaUsers, FaTicketAlt, FaChartBar } from 'react-icons/fa';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your platform</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card glass">
            <FaFilm className="stat-icon" />
            <div className="stat-content">
              <h3>156</h3>
              <p>Total Movies</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>2,847</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaTicketAlt className="stat-icon" />
            <div className="stat-content">
              <h3>12,345</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaChartBar className="stat-icon" />
            <div className="stat-content">
              <h3>₹5.2M</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-tabs glass">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
            >
              Movies
            </button>
            <button 
              className={`tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button 
              className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
          </div>

          <div className="admin-tab-content glass">
            {activeTab === 'overview' && (
              <div>
                <h2>Platform Overview</h2>
                <p>Welcome to the admin dashboard. Select a tab to manage different aspects of the platform.</p>
              </div>
            )}

            {activeTab === 'movies' && (
              <div>
                <div className="section-header">
                  <h2>Movie Management</h2>
                  <button className="btn btn-primary">Add New Movie</button>
                </div>
                <p>Manage all movies, add new releases, and update movie information.</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2>User Management</h2>
                <p>View and manage all registered users and their roles.</p>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2>Booking Management</h2>
                <p>Track and manage all bookings across the platform.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
