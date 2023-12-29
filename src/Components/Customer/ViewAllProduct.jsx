import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import ProductCard from './ProductCard';
import '../styles/ViewAllProduct.css';
import VerticalNavBar from './VerticalNavBar';

const ViewAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/customer/products-view')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <div>
  <VerticalNavBar/>
    <div className="product-list">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    
    </div>
  );
};

export default ViewAllProduct;