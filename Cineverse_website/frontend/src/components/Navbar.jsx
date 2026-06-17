import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-text">CineVerse</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              </li>
              
              {user?.role === 'ADMIN' && (
                <li>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
                </li>
              )}
              
              {user?.role === 'THEATRE_OWNER' && (
                <li>
                  <Link to="/theatre-owner" onClick={() => setMenuOpen(false)}>Theatre</Link>
                </li>
              )}
              
              <li className="navbar-user">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <FaUser /> {user?.name || user?.email}
                </Link>
              </li>
              
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
