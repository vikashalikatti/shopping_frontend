import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../AXIOS/AxiosInstance';
import jwtDecode from 'jwt-decode';

const Admin_Login = () => {
  // State for login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [token2, setToken2] = useState(null); // State to store decoded token
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('username', loginData.email);
      formData.append('password', loginData.password);

      // Send a POST request with the FormData
      const response = await axiosInstance.post('/admin/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) { // Handle a 201 status code as successful login
        // Handle successful login, e.g., redirect or display a success message
        console.log('Login success!');
        const token = response.data.data2;

        // Store the token in localStorage
        localStorage.setItem('token', token);
        
        // Decode the token using jwt-decode
        const decoded = jwtDecode(token);

        // Store the decoded token in the state variable token2
        setToken2(decoded);

        // Store the decoded token as a JSON string in localStorage
        localStorage.setItem('token2', JSON.stringify(decoded));

        navigate('/admin/home');
      } else {
        // Handle login error, e.g., display an error message
        console.error('Login failed.');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    // You can access the decoded token in the token2 state here
    if (token2) {
      console.log('Decoded Token:', token2);
    }
  }, [token2]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {/* Link to the Signup page */}
      <p>
        Don't have an account? <Link to="/admin_signup">Signup</Link>
      </p>
    </div>
  );
};

export default Admin_Login;
