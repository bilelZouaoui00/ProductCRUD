import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    name: "",
    price: null,
    quantity: null,
    image: "",
    discount: null,
    description: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/products", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };




  
  return (
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
                    placeholder="Enter product name"
                  />
                  <i className="fas fa-box"></i>
                </div>
                <div className="groupe">
                  <label>Price</label>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter price"
                  />
                  <i className="fas fa-money-bill"></i>
                </div>
                <div className="groupe">
                  <label>Quantity</label>
                  <input
                    type="text"
                    autoComplete="off"
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
                    placeholder="Enter image URL"
                  />
                  <i className="fas fa-image"></i>
                </div>
                <div className="groupe">
                  <label>Discount</label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="discount"
                    placeholder="Enter discount"
                  />
                  <i className="fas fa-percent"></i>
                </div>
                <div className="groupe">
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
              </div>

              <div className="pied-formulaire">
                <button className="btn" onClick={handleClick} >ADD Product</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Add;
