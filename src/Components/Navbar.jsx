import "./nav.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const pages = ['Products', 'Services', 'About-us', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard'];

  const userData = localStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      // Remove tokens from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('token2');
      // Navigate to the login page
      navigate('/login');
    } else {
      console.error('Logout failed. Server response:');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Function to navigate to customer login page
  const handleCustomerLogin = () => {
    navigate('/login/customer');
    closeDropdown();
  };

  // Function to navigate to merchant login page
  const handleMerchantLogin = () => {
    navigate('/merchant/login');
    closeDropdown();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {pages.map((page, index) => (
          <li key={index} className="navbar-item">
            <Link to={`/${page.toLowerCase()}`}>{page}</Link>
          </li>
        ))}
      </ul>
      <div className={`profile-dropdown ${showDropdown ? 'active' : ''}`}>
        <div className="user-info">
        </div>
        {/* Toggle button */}
        <div className="toggle-button" onClick={toggleDropdown}>
          <img
            src="/path/to/profile-picture.png"
            alt="Profile"
            className="profile-picture"
            tabIndex="0"
          />
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            {userData && (
              <ul className="settings-list">
                {settings.map((setting, index) => (
                  <li key={index} className="dropdown-item">
                    <Link to={`/${setting.toLowerCase()}`} onClick={closeDropdown}>
                      {setting}
                    </Link>
                  </li>
                ))}
                <li className="dropdown-item">
                  <a href="#!" onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
            {!userData && (
              <div className="login-buttons">
                <button onClick={handleCustomerLogin}>Login as Customer</button>
                <button onClick={handleMerchantLogin}>Login as Merchant</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
