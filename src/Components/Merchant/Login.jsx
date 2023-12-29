import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axiosInstance.post('/merchant/login', formData);

      if (response.data.status === 201) {
        // Login successful, navigate to a success page or dashboard
        console.log('Login successful');

        // Save the JWT token to local storage
        const token = response.data.data2;
        localStorage.setItem('token', token);

        // Decode the JWT token using jwt-decode
        const decodedToken = jwtDecode(token);

        // You can access specific claims from the decoded token, e.g., user ID
        const email = decodedToken.sub;
        // console.log('User ID:', userId);

        // Navigate to the merchant dashboard
        navigate('/merchant-dashboard');
      } else {
        // Handle other response status codes (if needed)
        console.error('Login failed with status code:', response.data.status);
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  const handleForgotPassword = () => {
    // Handle the "Forgot Password" action, such as navigating to the forgot password page
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="login-links">
        <a href="/forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </a>
        <span>|</span>
        <a href="/register">Sign Up</a>
      </div>
    </div>
  );
}
