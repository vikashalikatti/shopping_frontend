// ParentComponent.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Createwishlist from './Createwishlist';

const ParentComponent = () => {
  const [isCreateWishlistVisible, setIsCreateWishlistVisible] = useState(false);

  const handleProductCardClick = (productId) => {
    console.log('ProductCard clicked with productId:', productId);
    // You can perform any other actions here
    // For example, you might want to use the productId to update state or perform other logic
    setIsCreateWishlistVisible(true);
  };

  // Example product data with an id
  const productData = {
    id: 1, // Replace with your actual product id
    name: 'Sample Product',
    description: 'This is a sample product description.',
    price: 99.99,
    image: 'base64encodedimagestring', // replace with actual image data
  };

  return (
    <div>
      <ProductCard  onProductCardClick={handleProductCardClick} />
      {isCreateWishlistVisible && <Createwishlist />}
    </div>
  );
};

export default ParentComponent;
