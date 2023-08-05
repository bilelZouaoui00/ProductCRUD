import React from "react";
//axios => for HTTP requests
import axios from "axios";
//handle components state
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  //create a object state (product) & corresponding function(setProduct) that allow us to update the state
  const [product, setProduct] = useState({
    name: "",
    price: null,
    quantity: null,
    image: "",
    discount: null,
    description: "",
  });
  //initialize the object state as false no error finding
    //setError(false || true) => it is a way to track and handle errors (handle such errors scenarios)
  const [error, setError] = useState(false);
  //to navigate to different routes
  const navigate = useNavigate();
  //call back function when any input field changes
  //(e) => represent the event object that have information about the input field,
  //by accessing the event object we obtain the specific information about user actions
  const handleChange = (e) => {
    //prev => previous state ,e.target.name => represent the name of field,
    //e.target.value => Represents the value entered by user in the input field.
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(product);

  const handleClick = async (e) => {
    //prevent (didn't allow) the page from refreshing
    e.preventDefault();
    try {
      //send a post request
      //parse "product" as a a data payload
      await axios.post("http://localhost:8000/products", product);
      //the navigate to the "/" route
      navigate("/");
    } catch (err) {
      // console.log(err);
      console.log(err.message); // This logs the error message from Axios
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
        <h1 className="heading">
          ADD <span>Product</span>{" "}
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
                      name="name"
                      onChange={handleChange}
                      placeholder="Enter product name"
                    />
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="groupe">
                    <label>Price</label>
                    <input
                      type="number"
                      autoComplete="off"
                      name="price"
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                    <i className="fas fa-money-bill"></i>
                  </div>
                  <div className="groupe">
                    <label>Quantity</label>
                    <input
                      type="number"
                      autoComplete="off"
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
                      placeholder="Enter your image URL"
                      onChange={handleChange}
                    />
                    <i className="fas fa-image"></i>
                  </div>
                  <div className="groupe">
                    <label>Discount</label>
                    <input
                      type="number"
                      autoComplete="off"
                      name="discount"
                      onChange={handleChange}
                      placeholder="Enter discount"
                    />
                    <i className="fas fa-percent"></i>
                  </div>
                  <div className="groupe">
                    <label>Description</label>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      placeholder="Enter product description"
                    ></textarea>
                  </div>
                </div>

                <div className="pied-formulaire">
                  <button className="btn" onClick={handleClick}>
                    ADD Product
                  </button>
                  {error && "Something went wrong!"}
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

export default Add;
