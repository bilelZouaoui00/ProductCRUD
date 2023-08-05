import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import defaultImage from "./assets/img/category-2.png"; // Import a default image

import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Products = () => {
  //first argument :
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
    //invoked when the product is fetched
    fetchAllProducts();
    //second argument
    //execute only once (action should happen only once) with no other dependency
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      //reload the page
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // ****************************************************************
    <body>
      <div id="home"></div>

      <header>
        <div class="header-1">
          <a href="#" class="logo">
            {" "}
            <i class="fas fa-apple-alt"></i> StylShop{" "}
          </a>
        </div>
      </header>

      <section class="home">
        <div class="image">
          <img src={require("./assets/img/Untitled9.png")} alt="" />
        </div>
        <div class="content">
          <span>Natural & Sustainable</span>
          <h3>Eco-Friendly Choices</h3>
          <a href="#products" class="btn">
            Join Us
          </a>
        </div>
      </section>

      <section class="banner-container">
        <div class="banner">
          <img src={require("./assets/img/banner-2.jpg")} alt="" />

          <div class="content">
            <h3>Summer Sale </h3>
            <p>Extra 20% Off</p>
            <a href="#products" class="btn">
              Explore Now
            </a>
          </div>
        </div>

        <div class="banner">
          <img src={require("./assets/img/Untitled3.png")} alt="" />

          <div class="content">
            <h3>limited offers</h3>
            <p>Best Sellers</p>
            <a href="#products" class="btn">
              Explore Now
            </a>
          </div>
        </div>
      </section>

      {/* // Begin Product section */}
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
                <Link to={`/show/${product.id}`} className="fas fa-eye" />

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
                src={require("./assets/img/" + product.image)}
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
                $
                {(
                  product.price -
                  product.price * (product.discount / 100)
                ).toFixed(2)}{" "}
                <span>${product.price.toFixed(2)}</span>
              </div>
              <div className="quantity">
                <span>quantity :</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  defaultValue={product.quantity}
                  disabled
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
      {/* // End Product section */}

      <section class="footer header-1">
        <div class="box-container ">
          <div class="box">
            <a href="#" class="logo">
              {" "}
              <i class="fas fa-apple-alt"></i> StylShop{" "}
            </a>
            <p>
              Discover the bountiful world of organic delights at our Bio Food
              Emporium.
              <br></br>Indulge in the purest flavors and nourishing goodness of
              nature.
            </p>
            <div class="share">
              <a
                href="https://www.linkedin.com/in/bilel-zouaoui-680a67222/"
                target="_blank"
                class="btn fab fa-linkedin"
              ></a>
              <a
                href="https://github.com/bilelZouaoui00"
                target="_blank"
                class="btn fab fa-github"
              ></a>
            </div>
          </div>
        </div>
        <h1 class="credit">
          created by <span>Bilel Zouaoui</span>
        </h1>
      </section>
    </body>
  );
};

export default Products;
