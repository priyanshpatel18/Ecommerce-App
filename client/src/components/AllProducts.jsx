import ProductCard from "../components/ProductCard.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PriceFilterPhone from "../components/PriceFilterPhone.jsx";
import DiscountFilter from "../components/DiscountFilter.jsx";

export default function AllProducts({
  originalProducts,
  products,
  setProducts,
}) {
  return (
    <>
      <div className="productsContainer">
        <div className="sortContainer">
          <div className="categorySort">
            <h3>Category</h3>
            <Dropdown />
          </div>
          <div className="priceSort">
            <h3>Price</h3>
            <PriceFilterPhone
              originalProducts={originalProducts}
              setProducts={setProducts}
            />
          </div>
          <div className="discountSort">
            <h3>Discount</h3>
            <DiscountFilter
              originalProducts={originalProducts}
              setProducts={setProducts}
            />
          </div>
        </div>
        <div className="listContainer">
          <h2>Showing {products.length} Results</h2>
          <div className="productList">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
