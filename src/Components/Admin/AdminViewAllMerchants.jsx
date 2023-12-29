import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';

function AdminViewAllMerchants() {
  const [merchants, setMerchants] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Get token from local storage

  useEffect(() => {
    // Make a GET request to the "/admin/view-all-merchants" endpoint
    axiosInstance.get('/admin/view-all-merchants', {
      params: {
        token: token,
      },
    })
      .then((response) => {
        // Update the state with the list of merchants
        setMerchants(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching merchants:', error);
      });
  }, [token]);

  return (
    <div>
      <h1>Merchant List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map(({ id, name, mobile, email }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{mobile}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminViewAllMerchants;
