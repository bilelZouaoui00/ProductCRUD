//server.js
const mysql = require("mysql");
const express = require("express");

const app = express();
const port = 8000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

app.use(express.static('public'));


// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
//test with : http://localhost:3000/products


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

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
