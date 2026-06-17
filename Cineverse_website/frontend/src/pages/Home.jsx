import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTicketAlt, FaStar } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to CineVerse</h1>
          <p className="hero-subtitle">Your Gateway to Unlimited Entertainment</p>
          <div className="hero-buttons">
            <Link to="/movies" className="btn btn-primary">
              <FaPlay /> Browse Movies
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2 className="section-title">Why Choose CineVerse?</h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <FaTicketAlt className="feature-icon" />
            <h3>Easy Booking</h3>
            <p>Book your movie tickets in just a few clicks with our intuitive booking system</p>
          </div>
          <div className="feature-card glass">
            <FaStar className="feature-icon" />
            <h3>Latest Movies</h3>
            <p>Access the newest releases and blockbusters from around the world</p>
          </div>
          <div className="feature-card glass">
            <FaPlay className="feature-icon" />
            <h3>Best Theatres</h3>
            <p>Choose from premium theatres with the best viewing experience</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content glass">
            <h2>Ready to Start Your Cinema Journey?</h2>
            <p>Join thousands of movie lovers and book your next experience today</p>
            <Link to="/signup" className="btn btn-primary">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
