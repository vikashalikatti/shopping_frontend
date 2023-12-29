import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import '../styles/ProductCard.css';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import WishlistForm from './WishlistForm';
import Createwishlist from './Createwishlist';

const ProductCard = ({ product }) => {
  const uniqueClassName = `product-card-${product.id}`;
  const navigate = useNavigate();

  const [isWishlistFormVisible, setIsWishlistFormVisible] = useState(false);

  const handleButtonClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/customer');
      return;
    }
    console.log('Buy Now button clicked!');
  };

  const handleAddToWishlist = () => {
    setIsWishlistFormVisible(true);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/customer');
      return;
    }

    const decodedToken = jwtDecode(token);

    try {
      const subClaim = decodedToken.sub;
      const email = subClaim.split('|')[0].trim();
      const productId = product.id;

      axiosInstance.get(`/customer/cart-add/${productId}`, {
        params: {
          token: token,
          email: email,
        },
      })
        .then(response => {
          if (response.data.status === 202) {
            console.log('Accepted (202):', product.name);
          } else {
            console.log('Added to Cart:', product.name);
          }
        })
        .catch(error => {
          console.error('Error adding to Cart:', error);
        });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return (
    <div className={`product-card ${uniqueClassName}`}>
      <div className="product-header">
        {product.image && (
          <img
            src={`data:image/png;base64,${product.image}`}
            alt="Product"
            className="product-image"
          />
        )}
        <div className="product-buttons">
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-details">
        <span className="product-price">₹{product.price}</span>
        <button onClick={handleButtonClick}>Buy now</button>
      </div>

      {isWishlistFormVisible && <Createwishlist />}
    </div>
  );
};

export default ProductCard;
