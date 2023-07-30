import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import defaultImage from "./assets/img/category-1.png"; // Import a default image
import Products from "./Products";

const Show = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/${productId}`
        );
        const productData = response.data;

        // Check if the product image path is null or empty
        if (!productData.image) {
          productData.image = defaultImage;
        }

        setProduct(productData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleClick = () => {
    navigate("/");
  };

  if (!product) {
    // Display a loading state if the product data is not yet fetched
    return (
      <div>
        <h1>the Product does not exist </h1>
      </div>
    );
  }

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

      <section>
        <div className="wrapper">
          <div className="product-img" id="products">
            <img
              // src={require("./assets/img/" + product.image)}
              src={require(`./assets/img/${product.image}`)}
              // alt={product.image}
              alt={`./assets/img/${product.image}`}
              onError={(e) => (e.target.src = defaultImage)}
              height="420"
              width="327"
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>{product.name}</h1>
              <h2>Quantity : {product.quantity}</h2>
              <p>{product.description}
              <br></br><br></br>Discount : {product.discount}%
              <br></br>
              Discount Price : ${(product.price - (product.price * (product.discount / 100)))}
              </p>
            </div>
            <div className="product-price-btn">
              <p>
                <span>{product.price}</span>$
              </p>
              <button type="button" onClick={handleClick}>
                back
              </button>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Show;
