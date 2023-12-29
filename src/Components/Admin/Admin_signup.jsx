import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Admin_signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', signupData.username);
      formData.append('password', signupData.password);

      const response = await axiosInstance.post('/admin/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSignupData({
        username: '',
        password: '',
      });
      if (response.status === 201) {
        alert("Account Created Successfully");
        navigate('/admin');
      } else if (response.status === 208) {
        alert("Admin can't create more than one account");
        navigate('/admin');
      }
    } catch (error) {
      if (error.response && error.response.status === 208) {
        alert("Admin Cannot Create More than One");
      } else {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={signupData.username}
            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Admin_signup;