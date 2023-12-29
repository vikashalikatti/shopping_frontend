import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useNavigate } from 'react-router-dom';

function AdminAddPayment() {
  const [payment, setPayment] = useState({
    name: '', // Initialize with default values or leave them empty
  });

  const token = localStorage.getItem('token') || ''; // Get token from local storage
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object and append payment data
    const formData = new FormData();
    formData.append('name', payment.name);

    axiosInstance.post('/admin/payment-add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
      params: {
        token: token,
      },
    })
      .then((response) => {
        console.log('Payment added:', response.data);
        window.alert('Payment added successfully!');
        navigate('/admin/home')
      })
      .catch((error) => {
        console.error('Error adding payment:', error);
        window.alert('Payment can not more than 2 methods');
        navigate('/admin/home')
      });
  };

  return (
    <div>
      <h1>Add Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Payment Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={payment.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
}

export default AdminAddPayment;
