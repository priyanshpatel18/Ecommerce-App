import React, { useState } from "react";

export default function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["phones", "clothes", "shoes", "laptops"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (option) {
      window.location.href = `/products/${option}`;
    }
  };

  return (
    <>
      <select
        value={selectedOption || ""}
        onChange={(e) => handleSelect(e.target.value)}
        className="dropDown"
      >
        <option value="" disabled>
          Select a Category
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="options">
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
