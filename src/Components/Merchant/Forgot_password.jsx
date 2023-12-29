import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance'; // Update with your Axios instance
import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigation function

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await axiosInstance.post('/merchant/forgotpassword', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 200) {
        alert(response.data.message);
        // Navigate to Forget_otp_page with the email parameter
        navigate(`/merchant/forgot-otp/${email}`);
      } else {
        setError(response.data.message);
        setMessage('');
      }
    } catch (error) {
      setError('An error occurred while sending the forgot password request.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Forgot Password Request</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Forgot_password;
