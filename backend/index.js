//server.js

//API routing, HTTP Request
import express from "express";
//Database
import mysql from "mysql";
//Security features for server and client applications "Middleware"
import cors from "cors";

//create instance for the application
const app = express();
//add the CROS Middleware to the Express Application
app.use(cors());
//add a middleware to parse incoming JSON requests and pars it into javascript objects
//Handel JSON Data
app.use(express.json());

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is  listening on port ${port}`);
});

// Create a connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  database: "ProductCRUD",
  port: 3307,
});

// app.get("URL_Path",(request, result) => {
//   Body-here
// });

// first HTTP GET route (req : HTTP request object ; res : HTTP response object)
app.get("/", (req, res) => {
  res.send("Welcome to our first test!");
});

//Display all Products
app.get("/products", (req, res) => {
  //SQL query
  const q = "SELECT * FROM products";
  // q : query to execute ,
  //(err :if an error occurs during the query execution ,
  //    data : retrieved data if successfully query execution): callback function
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    // Retrieved data in JSON format
    return res.json(data);
  });
});

// Display one product
//:id => indicate dynamic parameters
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const q = "SELECT * FROM products WHERE id = ?";
  // [productId] => Array containing placeholder in the query
  db.query(q, [productId], (err, data) => {
    if (err) return res.send(err);
    if (data.length === 0) {
      // If no product is found with the given ID, return a 404 status code and an error message
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(data[0]); //send the first row
  });
});

//add new Product
app.post("/products", (req, res) => {
  const q =
    "INSERT INTO products(`name`,`price`,`quantity`, `image`, `discount`,`description`) VALUES (?)";

  const { name, price, quantity, image, discount, description } = req.body; //extract the request body
  //preparing values
  const values = [name, price, quantity, image, discount, description];
  //execute the sql query
  db.query(q, [values], (err, data) => {
    //handling the query
    if (err) return res.send(err);
    return res.json("product has been created");
  });
});

//Delete the product
app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const q = "DELETE FROM products WHERE id=?";

  db.query(q, [productId], (err, data) => {
    if (err) return res.send(err);
    return res.json("product has been deleted");
  });
});

//ADD the product
app.post("/products", (req, res) => {
  const q =
    "INSERT INTO products (`name`, `price`, `quantity`, `image`, `discount`, `description`)VALUES (?)";

  const values = [
    req.body.name,
    req.body.price,
    req.body.quantity,
    req.body.image,
    req.body.discount,
    req.body.description,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("product has been updated successfully.");
  });
});

//update query
app.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const q =
    "UPDATE products SET `name`=?, `price`=?, `quantity`=?, `image`=?, `discount`=?, `description`=? WHERE id = ? ";

  const values = [
    req.body.name,
    req.body.price,
    req.body.quantity,
    req.body.image,
    req.body.discount,
    req.body.description,
  ];
// ...values => is a spared operator, separate values array to individual elements
  db.query(q, [...values, productId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Product has been updated successfully");
  });
});
