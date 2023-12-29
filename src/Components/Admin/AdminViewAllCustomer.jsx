import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../AXIOS/AxiosInstance';

function AdminViewAllCustomer() {
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    // Make a GET request to the "/admin/view-all-customers" endpoint
    axiosInstance.get('/admin/view-all-customers', {
      params: {
        token: token,
      },
    })
      .then((response) => {
        // Update the state with the list of customers
        setCustomers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, [token]);

  return (
    <div>
      <h1>Customer List</h1>
      {customers.length === 0 ? (
        <p>No data present</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminViewAllCustomer;
