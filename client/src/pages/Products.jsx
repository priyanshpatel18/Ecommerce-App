import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Dropdown from "../components/Dropdown.jsx";
import PriceFilterPhone from "../components/PriceFilterPhone.jsx";
import DiscountFilter from "../components/DiscountFilter.jsx";
import Loader from "../components/Loader.jsx";

export default function Products({ setShowProductsList }) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        const categorizedProducts = res.data.filter(
          (product) => product.category === category
        );
        setOriginalProducts(categorizedProducts);
        setProducts(categorizedProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching Products: ", err);
        setIsLoading(false);
      });
  }, [category]);

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {" "}
          <Navbar
            setProducts={setProducts}
            originalProducts={originalProducts}
            setShowProductsList={setShowProductsList}
          />
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
      )}
    </>
  );
}
