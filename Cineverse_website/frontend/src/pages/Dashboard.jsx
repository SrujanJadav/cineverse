import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import bookingService from '../services/bookingService';
import { FaTicketAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getUserBookings();
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <FaCheckCircle style={{ color: '#2ecc71' }} />;
      case 'CANCELLED':
        return <FaTimesCircle style={{ color: '#e74c3c' }} />;
      case 'LOCKED':
        return <FaClock style={{ color: '#f39c12' }} />;
      default:
        return <FaClock style={{ color: '#3498db' }} />;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your bookings and profile</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card glass">
            <FaTicketAlt className="stat-icon" />
            <div className="stat-content">
              <h3>{bookings.length}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaCheckCircle className="stat-icon" />
            <div className="stat-content">
              <h3>{bookings.filter(b => b.status === 'CONFIRMED').length}</h3>
              <p>Confirmed</p>
            </div>
          </div>
          <div className="stat-card glass">
            <FaClock className="stat-icon" />
            <div className="stat-content">
              <h3>{bookings.filter(b => b.status === 'LOCKED').length}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="section-header">
            <h2>Your Bookings</h2>
            <Link to="/movies" className="btn btn-primary">Book New Show</Link>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : bookings.length === 0 ? (
            <div className="empty-state glass">
              <FaTicketAlt style={{ fontSize: '64px', color: 'var(--text-secondary)' }} />
              <h3>No bookings yet</h3>
              <p>Start exploring movies and book your first show!</p>
              <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card glass">
                  <div className="booking-header">
                    <div className="booking-movie">
                      <h3>{booking.movieTitle}</h3>
                      <p>{booking.theatreName} - {booking.screenName}</p>
                    </div>
                    <div className="booking-status">
                      {getStatusIcon(booking.status)}
                      <span>{booking.status}</span>
                    </div>
                  </div>
                  <div className="booking-details">
                    <div className="detail-item">
                      <strong>Date:</strong> {new Date(booking.showTime).toLocaleDateString()}
                    </div>
                    <div className="detail-item">
                      <strong>Time:</strong> {new Date(booking.showTime).toLocaleTimeString()}
                    </div>
                    <div className="detail-item">
                      <strong>Seats:</strong> {booking.seatNumbers?.join(', ') || 'N/A'}
                    </div>
                    <div className="detail-item">
                      <strong>Total:</strong> ₹{booking.totalAmount}
                    </div>
                  </div>
                  <div className="booking-actions">
                    <Link to={`/bookings/${booking.id}`} className="btn btn-secondary">
                      View Details
                    </Link>
                    {booking.status === 'CONFIRMED' && (
                      <button className="btn btn-primary">Download Ticket</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
