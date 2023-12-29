import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Admin_Home = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <Link to="/admin/view-all-products">
        <button>View All Products</button>
      </Link>
      <Link to="/admin/view-all-merchants">
        <button>View All Merchants</button>
      </Link>
      <Link to="/admin/view-all-customers">
        <button>View All Customers</button>
      </Link>
      <Link to="/admin/payment-add">
        <button>Add Payment</button>
      </Link>
      <Link to="/admin/view-all-payment">
        <button>View All Payments</button>
      </Link>
    </div>
  );
}

export default Admin_Home;
