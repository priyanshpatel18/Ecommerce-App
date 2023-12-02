import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import AllProducts from "../components/AllProducts.jsx";

export default function Products({ setShowProductsList, showProductsList }) {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://shophub-taupe.vercel.app/products")
      .then((res) => {
        const categorizedProducts = res.data.filter(
          (product) => product.category === category
        );
        setOriginalProducts(categorizedProducts);
        setProducts(categorizedProducts);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.error("Error Fetching Products: ", err);
        setIsLoading(false);
      });
  }, [category]);

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <> </>}
      <Navbar
        setProducts={setProducts}
        setShowProductsList={setShowProductsList}
      />
      <AllProducts
        originalProducts={originalProducts}
        products={products}
        setProducts={setProducts}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
