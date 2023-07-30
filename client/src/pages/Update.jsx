import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Update = () => {
  const [product, setProduct] = useState({
    name: "",
    price: null,
    quantity: null,
    image: "",
    discount: null,
    description: "",
  });

  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[2];

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/products/" + productId
      );
      setProduct(response.data); // Set the fetched data as the initial state
    } catch (err) {
      console.log(err);
      setError(true);
      // Set default values for the product in case of an error or if the product is not found
      setProduct({
        name: "Default Name",
        price: 0,
        quantity: 0,
        image: "",
        discount: 0,
        description: "Default Description",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8000/products/" + productId, product);
      // console.log(product);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
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

      <section className="products" id="products">
        {/* {console.log(product)} */}
        <h1 className="heading">
          Product <span>Update</span>{" "}
        </h1>
        <img src={"./assets/img/category-1.png"} alt="" />
        <div className="container2">
          <section id="addProduct">
            <form>
              <h1>Add Product</h1>
              <div className="separation"></div>
              <div className="corps-formulaire">
                <div className="gauche">
                  <div className="groupe">
                    <label>Product Name</label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={product.name || ""} // Set the value to the state value
                      name="name"
                      onChange={handleChange}
                      placeholder="Enter product name"
                    />
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="groupe">
                    <label>Price</label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={product.price || 0}
                      name="price"
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                    <i className="fas fa-money-bill"></i>
                  </div>
                  <div className="groupe">
                    <label>Quantity</label>
                    <input
                      type="text"
                      autoComplete="off"
                      value={product.quantity || 0}
                      name="quantity"
                      onChange={handleChange}
                      placeholder="Enter quantity"
                    />
                    <i className="fas fa-sort-numeric-up"></i>
                  </div>
                  <div className="groupe">
                    <label>Image URL</label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="image"
                      value={product.image || ""}
                      onChange={handleChange}
                      placeholder="Enter your image URL"
                    />
                    <i className="fas fa-image"></i>
                  </div>
                  <div className="groupe">
                    <label>Discount</label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="discount"
                      value={product.discount || ""}
                      onChange={handleChange}
                      placeholder="Enter discount"
                    />
                    <i className="fas fa-percent"></i>
                  </div>
                  <div className="groupe">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={product.description || ""}
                      onChange={handleChange}
                      placeholder="Enter product description"
                    ></textarea>
                  </div>
                </div>

                <div className="pied-formulaire">
                  <button className="btn" onClick={handleClick}>
                    Update Product
                  </button>
                  <br />
                  <Link to="/">See all Products</Link>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </body>
  );
};

export default Update;
