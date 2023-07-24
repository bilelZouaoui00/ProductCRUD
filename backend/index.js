//server.js
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
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

// first test
app.get("/", (req, res) => {
  res.send("Welcome to our first test!");
});

//Display all Products
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
//add new Product
app.post("/products", (req, res) => {
  const { name, price, quantity, image, discount, description } = req.body;

  // Check if the "name" property is empty
  if (!name) {
    return res.status(400).json({ error: "Product name cannot be empty" });
  }

  const q =
    "INSERT INTO products(`name`,`price`,`quantity`, `image`, `discount`,`description`) VALUES (?)";

  const values = [name, price, quantity, image, discount, description];

  db.query(q, [values], (err, res) => {
    if (err) return res.send(err);
    //return res.json(data);
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

//update the product
app.post("/products", (req, res) => {
  const q = "INSERT INTO products (`name`, `price`, `quantity`, `image`, `discount`, `description`)VALUES (?)";
  


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
