import React from "react";

export default function Card({ Object }) {
  return (
    <div className="wrapper">
      <h2>{Object.heading}</h2>
      <div className="boxes">
        {Object.items.map((item, index) => (
          <a key={index} href="/">
            <div
              style={{
                backgroundImage: `url(${item.url})`,
              }}
            ></div>
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
