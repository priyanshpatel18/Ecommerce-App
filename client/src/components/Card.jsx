import React from "react";

export default function Card({ Object }) {
  return (
    <div className="wrapper">
      <h2>{Object.heading}</h2>
      <div className="boxes">
        <a href={`/products/category/${Object.link}`}>
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${Object.thumbnail})` }}
          ></div>
        </a>
      </div>
    </div>
  );
}
