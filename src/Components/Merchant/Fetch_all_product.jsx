import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/fetch_all_products.css';

const Fetch_all_product = () => {
  const [productData, setProductData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    stock: '',
    status: false,
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found in local storage.');
      return;
    }

    const decodedToken = jwtDecode(token);
    const subClaim = decodedToken.sub;
    const email = subClaim.split('|')[0].trim();
    const apiUrlWithParams = `/merchant/product-view?token=${token}&email=${email}`;

    axiosInstance
      .get(apiUrlWithParams)
      .then((response) => {
        const productArray = response.data.data || [];
        setProductData(productArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUpdateProduct = (productId) => {
    // Find the selected product by its ID
    const selectedProduct = productData.find((product) => product.id === productId);

    // Set the selected product data in state
    setUpdateFormData({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      stock: selectedProduct.stock,
      status: selectedProduct.status,
    });

    setSelectedProductId(productId);
  };

  const handleCancelUpdate = () => {
    // Clear the update form data and selected product
    setUpdateFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      stock: '',
      status: false,
    });
    setSelectedProductId(null);
    setImageFile(null); // Clear the selected image file
  };

  const handleDeleteProduct = (productId) => {
    // Handle deleting a product
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const subClaim = decodedToken.sub;
    const email = subClaim.split('|')[0].trim();
    const apiUrl = `/merchant/product-delete/${productId}`;

    if (!token) {
      console.error('Token not found in local storage.');
      return;
    }

    axiosInstance
      .get(apiUrl, {
        params: {
          token: token,
          email: email,
        },
      })
      .then((response) => {
        if (response.status === 202) {
          // Product deleted successfully
          const updatedProductData = productData.filter((product) => product.id !== productId);
          setProductData(updatedProductData);
        } else {
          console.error('Failed to delete product:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleLogout = () => {
    // Handle user logout (clear token and redirect to the login page)
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page after logout
  };

  const handleSubmitUpdate = () => {
    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();

    // Append the updated product data to the FormData object
    formData.append('id', selectedProductId);
    formData.append('name', updateFormData.name);
    formData.append('price', updateFormData.price);
    formData.append('description', updateFormData.description);
    formData.append('stock', updateFormData.stock);

    // Append the image file if it exists
    if (imageFile) {
      formData.append('pic', imageFile); // Use 'pic' as the field name to match your server's parameter name
    }

    // Append the token and email to the FormData object
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const subClaim = decodedToken.sub;
    const email = subClaim.split('|')[0].trim();
    formData.append('token', token);
    formData.append('email', email);

    // Send the FormData object to the server for updating the product
    axiosInstance
      .post(`/merchant/product-update/${selectedProductId}`, formData)
      .then((response) => {
        handleCancelUpdate();
        navigate('/merchant-dashboard')
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  // Render the component
  return (
    <div>
      <div className="product-grid-container">
        {/* Render product list */}
        {productData.length === 0 ? (
          <div>
            <p>No products found.</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          productData.map((product) => (
            <div key={product.id} className="product-card">
              {/* Render product details */}
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p> {/* Display price in Rupees */}
              <p>Description: {product.description}</p>
              <p>Stock: {product.stock}</p>
              <p>Status: {product.status ? 'Active' : 'Inactive'}</p>
              {/* Display the product image if it exists */}
              {product.image && (
                <img
                  src={`data:image/png;base64,${product.image}`} // Assuming the image format is PNG
                  alt="Product"
                  className="product-image"
                />
              )}
              {selectedProductId === product.id ? (
                <div className="product-update-form">
                  {/* Render the update form */}
                  <h2>Update Product</h2>
                  <form>
                    {/* Form inputs for updating product */}
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      value={updateFormData.name}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
                    />
                    
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      id="price"
                      placeholder="Price"
                      value={updateFormData.price}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, price: e.target.value })}
                    />
                    
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      id="description"
                      placeholder="Description"
                      value={updateFormData.description}
                      onChange={(e) =>
                        setUpdateFormData({ ...updateFormData, description: e.target.value })
                      }
                    />
                    
                    <label htmlFor="stock">Stock:</label>
                    <input
                      type="text"
                      id="stock"
                      placeholder="Stock"
                      value={updateFormData.stock}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, stock: e.target.value })}
                    />
                    
                    {/* Input field for uploading a new image */}
                    <label htmlFor="image">Image:</label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <button type="button" onClick={handleSubmitUpdate}>
                      Update
                    </button>
                    <button type="button" onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Render buttons for edit and delete */}
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  <button onClick={() => handleUpdateProduct(product.id)}>Edit</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Fetch_all_product;
