import React, { useState } from 'react';
import AddProductForm from './AddProductForm';

const App = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  return (
    <div>
      {/* Your existing code to display products */}
      {/* ... */}
      {/* Button to show/hide the "Add Product" form */}
      <button onClick={toggleAddProductForm}>Add Product</button>

      {/* Conditionally render the "Add Product" form based on showAddProductForm state */}
      {showAddProductForm && <AddProductForm />}
    </div>
  );
};

export default App;
