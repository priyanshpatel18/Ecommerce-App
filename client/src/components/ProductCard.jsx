import React from "react";

const ProductCard = ({ product, index }) => (
  <a href={`/products/${product._id}`} key={index} className="product">
    <div className="imageContainer">
      <img src={product.imageUrl} alt="thumbnail" />
    </div>
    <div className="detailsContainer">
      <h3>{product.name}</h3>
      <div className="priceContainer">
        <span className="discountedPrice">
          ₹
          {product.price - Math.round((product.price * product.discount) / 100)}
        </span>
        <span className="mrp">M.R.P.</span>
        <span className="mrpPrice">₹{product.price}</span>
      </div>
      <p className="description">
        {product.description.length > 50
          ? `${product.description.slice(0, 50)}...`
          : product.description}
      </p>
    </div>
  </a>
);

export default ProductCard;
