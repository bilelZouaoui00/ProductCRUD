//products.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Create a connection to MySQL
const connection = mysql.createConnection({
  host: "localhost",
  database: "ProductCRUD",
  port: 3307,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// GET all products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "Failed to retrieve products" });
      return;
    }

    res.json(results);
  });
});

// Get a specific product by ID
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM products WHERE id = ?"; // Assuming your table is named 'products'

  connection.query(query, productId, (error, results) => {
    if (error) {
      console.error("Error retrieving product:", error);
      res.status(500).json({ error: "Failed to retrieve product" });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

// POST create a product
router.post("/", (req, res) => {
  const { name, price, quantity, image, discount, description } = req.body;

  // Validate the required fields
  if (!name || !price || !quantity) {
    return res
      .status(400)
      .json({ error: "Name, price, and quantity are required fields" });
  }

  const newProduct = {
    name,
    price,
    quantity,
    image,
    discount: discount || 0,
    description,
  };

  const query = "INSERT INTO products SET ?";

  connection.query(query, newProduct, (error, result) => {
    if (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Failed to create product" });
    }

    const createdProduct = { id: result.insertId, ...newProduct };
    res.status(201).json(createdProduct);
  });
});

// PUT update a product
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, quantity, image, discount, description } = req.body;
  
    // Validate the required fields
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: 'Name, price, and quantity are required fields' });
    }
  
    const updatedProduct = {
      name,
      price,
      quantity,
      image,
      discount: discount || 0,
      description,
    };
  
    const query = 'UPDATE products SET ? WHERE id = ?';
  
    connection.query(query, [updatedProduct, productId], (error, result) => {
      if (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Failed to update product' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product updated successfully' });
    });
  });
  
  // DELETE a product
  router.delete('/:id', (req, res) => {
    const productId = req.params.id;
  
    const query = 'DELETE FROM products WHERE id = ?';
  
    connection.query(query, productId, (error, result) => {
      if (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Failed to delete product' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    });
  });
  

module.exports = router;
