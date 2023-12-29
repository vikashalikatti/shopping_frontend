import React from 'react'
import { Link } from 'react-router-dom';

const Merchant_home = () => {
  return (
    <div>
      <h1>Welcome to Merchant Home</h1>
      <Link to={'/merchant-dashboard/add-products'}><button>Add Products</button></Link>
      <br /><br />
      <Link to={'/merchant-dashboard/view-products'}><button>View All Products</button></Link>
      
    </div>
  )
}

export default Merchant_home;

