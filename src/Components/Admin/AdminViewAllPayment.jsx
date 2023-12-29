import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';

function AdminViewAllPayment() {
  const [payments, setPayments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Make a GET request to the "/view-all-payment" endpoint
    axiosInstance.get('/admin/view-all-payment', {
      params: {
        token: token,
      },
    })
      .then((response) => {
        // Update the state with the list of payments
        setPayments(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  }, [token]);

  return (
    <div>
      <h1>Payment List</h1>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>{payment.name}</li>
          // Replace 'id' and 'name' with the actual properties of your Payment object
        ))}
      </ul>
    </div>
  );
}

export default AdminViewAllPayment;
