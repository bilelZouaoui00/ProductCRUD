import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    // Fetch the list of existing products from the backend
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your Node.js backend
    fetch('YOUR_BACKEND_URL/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        <button onClick={toggleAddProductForm}>Add Product</button>
      </div>
      <div className="product-container">
        {/* Display existing products */}
        {products.map((product) => (
          <div className="box" key={product.id}>
            {/* Your existing product HTML structure */}
            {/* You can render product details here */}
          </div>
        ))}
      </div>
      {showAddProductForm && <AddProductForm />}
    </div>
  );
};

export default App;