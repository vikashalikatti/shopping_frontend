import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import '../styles/admin_fetch_product.css'
import { useNavigate } from 'react-router-dom';

const Admin_View_all_products = () => {
  const [productList, setProductList] = useState([]);
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/admin/view-all-products', {
          params: {
            token: token, 
          },
        });

        const products = response.data.data || [];
        setProductList(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    if (token) {
      fetchProducts();
    } else {
      console.error('Token not found in local storage.');
    }
  }, [token]);

  const handleStatusChange = async (productId) => {
    try {
      const response = await axiosInstance.get(`/admin/product-changestatus/${productId}`, {
        params: {
          token: token, 
        },
      });
      const updatedProduct = response.data.data;
      setProductList((prevProductList) =>
        prevProductList.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      navigate('/admin/home')
      alert("status changed")
    } catch (error) {
      console.error('Error changing product status:', error);
    }
  };
  

  return (
    <div>
      <h2>Admin View All Products</h2>
      {/* Render your product list in a grid */}
      <div className="product-grid-container">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Stock: {product.stock}</p>
            <p>Status: {product.status ? 'Active' : 'Inactive'}</p>
            {product.image && (
              <img
                src={`data:image/png;base64,${product.image}`} // Assuming the image format is PNG
                alt="Product"
                className="product-image"
              />
            )}
            <button onClick={() => handleStatusChange(product.id)}>
              {product.status ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin_View_all_products;
