import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

const Resetpassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const resetPasswordEmail = location.state ? location.state.email : '';
  
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', resetPasswordEmail);
      formData.append('password', newPassword);

      const response = await axiosInstance.post('merchant/reset-password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Password reset successful');
      setError('');
      navigate('/login');
    } catch (err) {
      setError('An error occurred while resetting the password.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Resetting password for: {resetPasswordEmail}</p>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Resetpassword;
