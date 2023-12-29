import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/VerticalNavBar.css'; // Import the CSS file
import Createwishlist from './Createwishlist';

const VerticalNavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [uniqueClassName, setUniqueClassName] = useState('');
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);

  useEffect(() => {
    // Generate a unique class name when the component mounts
    const generatedClassName = `product-${Date.now()}`;
    setUniqueClassName(generatedClassName);
  }, []);

  const handleViewCart = async () => {
    try {
      const serverEndpoint = 'http://localhost:8080/customer/cart-view';
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const subClaim = decodedToken.sub;
      const email = subClaim.split('|')[0].trim();

      const response = await axios.get(serverEndpoint, {
        params: {
          token: token,
          email: email,
        },
      });

      console.log('Server response:', response.data);

      setCartProducts(response.data);

      setShowCart(!showCart);
    } catch (error) {
      console.error('Error sending request to server:', error);
    }
  };

  const handleButtonClick = () => {
    console.log('Buy Now button clicked!');
  };

  const handelRemoveButton = async (productId) => {
    try {
      const serverBaseUrl = 'http://localhost:8080/customer';
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const subClaim = decodedToken.sub;
      const email = subClaim.split('|')[0].trim();

      const response = await axios.get(`${serverBaseUrl}/cart-remove/${productId}`, {
        params: {
          token: token,
          email: email,
        },
      });

      console.log('Product removed successfully:', response.data);

      setCartProducts((prevProducts) => ({
        ...prevProducts,
        data: prevProducts.data
          .map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }
            return product;
          })
          .filter((product) => product.quantity > 0),
      }));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleWishlistHover = () => {
    setIsWishlistHovered(true);
  };

  const handleWishlistLeave = () => {
    setIsWishlistHovered(false);
  };

  const WishlistForm = ({ productId, onClose }) => {
    const handleCreateWish = () => {
      console.log('Create Wish button clicked!');
      
    };

    const handleViewWish = () => {
      console.log('View Wish button clicked!');
      // Implement logic for viewing a wish
      // Add your specific logic or navigation code here
    };

    return (
      <div className={`wishlist-form ${uniqueClassName}`}>
        <button className="wishlistButton1" onClick={handleCreateWish}>
          Create Wish
        </button>
        <button className="wishlistButton1" onClick={handleViewWish}>
          View Wish
        </button>
      </div>
    );
  };

  return (
    <div className={`navBar1 ${uniqueClassName}`}>
      <button className="cartButton1" onClick={handleViewCart}>
        View Cart
      </button>
      <div
        className={`cartButton1 wishlist-button ${isWishlistHovered ? 'wishlist-hovered' : ''}`}
        onMouseEnter={handleWishlistHover}
        onMouseLeave={handleWishlistLeave}
      >
        Wishlist
        {isWishlistHovered && <WishlistForm />}
      </div>
      <button className="cartButton1">View Order</button>

      {showCart && (
        <div className={`cartContent1 ${uniqueClassName}`}>
          <h3>Cart Content</h3>
          {Array.isArray(cartProducts.data) && cartProducts.data.length > 0 ? (
            cartProducts.data.map((product) => (
              <div key={product.id} className={`product-card1 ${uniqueClassName}`}>
                <div className="product-header1">
                  {product.image && (
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt="Product"
                      className="product-image"
                    />
                  )}
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.quantity}</p>
                <div className="product-details1">
                  <span className="product-price1">₹{product.price}</span>
                  <br />
                  <div className="btn">
                    <button className="button1" onClick={handleButtonClick}>
                      Buy now
                    </button>
                    <button
                      className="button1"
                      onClick={() => handelRemoveButton(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products in the cart.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerticalNavBar;
