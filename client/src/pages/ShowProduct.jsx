import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const ShowProduct = ({ setShowProductsList }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      <Navbar setShowProductsList={setShowProductsList} />
      <div className="productDisplayContainer">
        <div className="imageContainer">
          <img
            src={product.imageUrl}
            alt="thumbnail"
            className="productImage"
          />
        </div>
        <div className="detailsContainer">
          <h1 className="productName">{product.name}</h1>
          <p className="productDescription">{product.description}</p>
          <div className="priceContainer">
            <h2 className="productDiscount">-{product.discount}%</h2>
            <h2 className="productPrice">
              ₹
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </h2>
          </div>
          <h2 className="actualPrice">M.R.P. {product.price}</h2>
          <p className="productStock">
            {product.quantity > 0 && <span className="inStock">In Stock</span>}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
