import React, { useState } from "react";
import { useSnackbar } from "notistack";

export default function PriceFilterPhone({
  originalProducts,
  setProducts,
  setIsLoading,
}) {
  const [selectedRange, setSelectedRange] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  function handleRadioChange(range) {
    setSelectedRange(range);
  }

  function handlePriceFilter(selectedRange) {
    setIsLoading(true);

    setTimeout(() => {
      let filteredProducts = [...originalProducts];

      switch (selectedRange) {
        case "under10000":
          filteredProducts = filteredProducts.filter(
            (p) => p.price - Math.round((p.price * p.discount) / 100) < 10000
          );
          break;
        case "between10000And25000":
          filteredProducts = filteredProducts.filter(
            (p) =>
              p.price - Math.round((p.price * p.discount) / 100) > 10000 &&
              p.price - Math.round((p.price * p.discount) / 100) < 25000
          );
          break;
        case "between25000And40000":
          filteredProducts = filteredProducts.filter(
            (p) =>
              p.price - Math.round((p.price * p.discount) / 100) > 25000 &&
              p.price - Math.round((p.price * p.discount) / 100) < 40000
          );
          break;
        case "over40000":
          filteredProducts = filteredProducts.filter(
            (p) => p.price - Math.round((p.price * p.discount) / 100) > 40000
          );
          break;
        default:
          enqueueSnackbar("Select an Option", { variant: "error" });
          break;
      }
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }

  return (
    <div className="priceFilter">
      <label>
        <input
          type="radio"
          name="priceRange"
          value="under10000"
          checked={selectedRange === "under10000"}
          onChange={() => handleRadioChange("under10000")}
        />
        Under ₹10,000
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="priceRange"
          value="between10000And25000"
          checked={selectedRange === "between10000And25000"}
          onChange={() => handleRadioChange("between10000And25000")}
        />
        ₹10,000 - ₹25,000
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="priceRange"
          value="between25000And40000"
          checked={selectedRange === "between25000And40000"}
          onChange={() => handleRadioChange("between25000And40000")}
        />
        ₹25,000 - ₹40,000
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="priceRange"
          value="over40000"
          checked={selectedRange === "over40000"}
          onChange={() => handleRadioChange("over40000")}
        />
        Over ₹40000
      </label>
      <button
        className="filterBtn"
        onClick={() => handlePriceFilter(selectedRange)}
      >
        Apply
      </button>
    </div>
  );
}
