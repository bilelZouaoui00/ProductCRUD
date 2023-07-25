import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import defaultImage from "./assets/img/category-2.png"; // Import a default image

import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Products = () => {
  // Create a useState hook to store the products data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products");
        console.log(res.data); // Log the response to see if data is fetched properly
        setProducts(res.data); // Set the fetched data to the products state
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (

    // ****************************************************************
    <section className="products" id="products">
      <h1 className="heading">
        latest <span>products</span>{" "}
      </h1>
      <img src={"./assets/img/category-1.png"} alt="" />

      <div className="box-container centered-container" id="productContainer">
        {products.map((product) => (
          <div key={product.id} className="box">
            <span className="discount">-{product.discount}%</span>
            <div className="icon">
              <a href="#" className="fas fa-eye"></a>

              <Link to={`/update/${product.id}`} className="fas fa-edit" />
              <a
                href="#"
                className="fas fa-trash"
                onClick={() => handleDelete(product.id)}
              ></a>
            </div>

            {/* <img src={"C:\Users\BILEL\Documents\Bureau\My Project ( Dev )\ProductCRUD\client\src\pages\assets\img\category-1.png" + product.image} alt={product.name} /> */}
            {/* <img src={"./assets/img/" + product.image} alt={product.image} /> */}

            <img
              src={require("./assets/img/category-1.png")}
              alt={product.name}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <h3>{product.name}</h3>
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <div className="price">
              $${product.price} <span>${product.price}</span>
            </div>
            <div className="quantity">
              <span>quantity :</span>
              <input
                type="number"
                min="1"
                max="100"
                defaultValue={product.quantity}
              />
              <span> /kg</span>
            </div>
            {/* <a href="#" className="btn">
              add to cart
            </a> */}
          </div>
        ))}

        <div key={22} className="box2">
          <Link to="/add">
            <img
              src={require("./assets/img/add-button.png")}
              alt="add Product"
              onError={(e) => (e.target.src = defaultImage)}
            />
          </Link>
        </div>

        {/* <button className="btn">
          <Link to="/add">Add new book</Link>
        </button> */}
      </div>
    </section>
  );
};

export default Products;
