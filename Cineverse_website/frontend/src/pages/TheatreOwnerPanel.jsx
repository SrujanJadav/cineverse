import React, { useState } from 'react';
import { FaTheaterMasks, FaFilm, FaClock, FaChartLine } from 'react-icons/fa';
import '../styles\AdminPanel.css';

const TheatreOwnerPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Theatre Owner Dashboard</h1>
          <p>Manage your theatres and shows</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card glass">
            <FaTheaterMasks className="stat-icon" />
            <div className="stat-content">
              <h3>5</h3>
              <p>My Theatres</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaFilm className="stat-icon" />
            <div className="stat-content">
              <h3>28</h3>
              <p>Active Shows</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaClock className="stat-icon" />
            <div className="stat-content">
              <h3>156</h3>
              <p>Today's Shows</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaChartLine className="stat-icon" />
            <div className="stat-content">
              <h3>₹1.2M</h3>
              <p>This Month</p>
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
              className={`tab ${activeTab === 'theatres' ? 'active' : ''}`}
              onClick={() => setActiveTab('theatres')}
            >
              Theatres
            </button>
            <button 
              className={`tab ${activeTab === 'shows' ? 'active' : ''}`}
              onClick={() => setActiveTab('shows')}
            >
              Shows
            </button>
            <button 
              className={`tab ${activeTab === 'revenue' ? 'active' : ''}`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue
            </button>
          </div>

          <div className="admin-tab-content glass">
            {activeTab === 'overview' && (
              <div>
                <h2>Theatre Overview</h2>
                <p>Welcome to your theatre management dashboard. Manage your theatres, schedule shows, and track revenue.</p>
              </div>
            )}

            {activeTab === 'theatres' && (
              <div>
                <div className="section-header">
                  <h2>My Theatres</h2>
                  <button className="btn btn-primary">Add New Theatre</button>
                </div>
                <p>Manage your theatre locations, screens, and seat layouts.</p>
              </div>
            )}

            {activeTab === 'shows' && (
              <div>
                <div className="section-header">
                  <h2>Show Management</h2>
                  <button className="btn btn-primary">Schedule New Show</button>
                </div>
                <p>Schedule shows, set timings, and manage show availability.</p>
              </div>
            )}

            {activeTab === 'revenue' && (
              <div>
                <h2>Revenue Analytics</h2>
                <p>Track your theatre revenue, booking trends, and performance metrics.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheatreOwnerPanel;
