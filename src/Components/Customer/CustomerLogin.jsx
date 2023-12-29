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

      const response = await axiosInstance.post('/customer/login', formData);

      if (response.status === 201) {
        console.log('Login successful');
        const token = response.data.data2;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub;
        navigate('/');
      } else {
        console.error('Login failed with status code:', response.data.status);
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  const handleForgotPassword = () => {
    navigate('/customer/forgot-password');
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
        <a href="/customer/forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </a>
        <span>|</span>
        <a href="/customer/register">Sign Up</a>
      </div>
    </div>
  );
}
