import ProductCard from "../components/ProductCard.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PriceFilterPhone from "../components/PriceFilterPhone.jsx";
import DiscountFilter from "../components/DiscountFilter.jsx";

export default function AllProducts({
  originalProducts,
  products,
  setProducts,
  setIsLoading,
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
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="discountSort">
            <h3>Discount</h3>
            <DiscountFilter
              originalProducts={originalProducts}
              setProducts={setProducts}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
        <div className="listContainer">
          <h2>Showing {products?.length || 0} Results</h2>
          <div className="productList">
            {products?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
