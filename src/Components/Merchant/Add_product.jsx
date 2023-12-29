import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: null,
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = event => {
    setFormData({ ...formData, image: event.target.files[0] });
  };
  const navigate = useNavigate();  
  const handleSubmit = async event => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('pic', formData.image);

    try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
      const subClaim = decodedToken.sub;
      const email = subClaim.split('|')[0].trim();

      formDataToSend.append('token', token);
      formDataToSend.append('email', email);

      const response = await axiosInstance.post('/merchant/product-add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // console.log('Product added successfully');
        setFormData({
          name: '',
          price: '',
          description: '',
          stock: '',
          image: null,
        });
        alert("Product added successfully");
      navigate('/merchant-dashboard')
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Stock:
          <input type="text" name="stock" value={formData.stock} onChange={handleInputChange} />
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
