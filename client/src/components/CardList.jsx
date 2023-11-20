import React, { useState } from "react";
import Card from "./Card.jsx";
import data from "../data/data.js";

export default function CardList() {
  const [cards, setCards] = useState(Object.keys(data));

  return (
    <>
      <div className="cardContainer">
        {cards.map((card, index) => (
          <Card key={index} Object={data[card]} />
        ))}
      </div>
    </>
  );
}
