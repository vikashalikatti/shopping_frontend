import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AXIOS/AxiosInstance';

const CustomerSignup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    date: '',
    gender: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('mobile', data.mobile);
      formData.append('password', data.password);
      formData.append('date', data.date);
      formData.append('gender', data.gender);
      formData.append('address', data.address);

      const response = await axiosInstance.post('/customer/signup', formData);
      
      if (response.status === 201) {
        setVerificationSent(true);
      }
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Customer Signup</h2>
      {loading ? (
        <p>Loading...</p>
      ) : verificationSent ? (
        <p>Verification link has been sent to your email address. Please check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={data.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={data.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="mobile">Mobile</label>
            <input type="text" id="mobile" name="mobile" value={data.mobile} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={data.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="date">Date of Birth</label>
            <input type="date" id="date" name="date" value={data.date} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleChange} required />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" onChange={handleChange} required />
                Female
              </label>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={data.address} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomerSignup;
