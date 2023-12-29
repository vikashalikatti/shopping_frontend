import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import your HTTP library

const Createwishlist = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Send a request to the server here
    // Replace the URL and method with your actual API endpoint and method
    axios.get('your_server_endpoint')
      .then(response => {
        // Handle the response from the server
        console.log('Server response:', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCreateButtonClick = () => {
    // Handle create button click
    console.log('Create button clicked! Input value:', inputValue);
    // You can send another request to the server or perform other actions here
  };

  return (
    <div>
      <h1>Create Wishlist</h1>
      <label>
        Input:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleCreateButtonClick}>Create</button>
    </div>
  );
};

export default Createwishlist;
