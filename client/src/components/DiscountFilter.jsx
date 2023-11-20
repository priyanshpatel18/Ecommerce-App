import React, { useState } from "react";
import { useSnackbar } from "notistack";

export default function DiscountFilter({
  originalProducts,
  setProducts,
  setIsLoading,
}) {
  const [selectedRange, setSelectedRange] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  function handleRadioChange(range) {
    setSelectedRange(range);
  }

  function handleDiscountFilter(selectedRange) {
    setIsLoading(true);

    setTimeout(() => {
      let filteredProducts = [...originalProducts];

      switch (selectedRange) {
        case "over10":
          filteredProducts = filteredProducts.filter((p) => p.discount > 10);
          setProducts(filteredProducts);
          break;
        case "over20":
          filteredProducts = filteredProducts.filter((p) => p.discount > 20);
          setProducts(filteredProducts);
          break;
        case "over35":
          filteredProducts = filteredProducts.filter((p) => p.discount > 35);
          setProducts(filteredProducts);
          break;
        default:
          enqueueSnackbar("Select an Option", { variant: "error" });
          break;
      }

      setIsLoading(false);
    }, 500);
  }

  return (
    <div className="discountFilter">
      <label>
        <input
          type="radio"
          name="discountRange"
          value="over10"
          checked={selectedRange === "over10"}
          onChange={() => handleRadioChange("over10")}
        />
        10% or more
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="discountRange"
          value="over20"
          checked={selectedRange === "over20"}
          onChange={() => handleRadioChange("over20")}
        />
        20% or more
      </label>
      <br />

      <label>
        <input
          type="radio"
          name="discountRange"
          value="over35"
          checked={selectedRange === "over35"}
          onChange={() => handleRadioChange("over35")}
        />
        35% or more
      </label>
      <br />

      <button
        className="filterBtn"
        onClick={() => handleDiscountFilter(selectedRange)}
      >
        Apply
      </button>
    </div>
  );
}
