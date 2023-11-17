import Navbar from "../components/Navbar.jsx";
import CardList from "../components/CardList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AllProducts from "../components/AllProducts.jsx";
import Loader from "../components/Loader.jsx";

export default function Home() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProductsList, setShowProductsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        setOriginalProducts(res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <></>}
      <div className="main">
        <Navbar
          originalProducts={originalProducts}
          setProducts={setProducts}
          setShowProductsList={setShowProductsList}
        />
        {showProductsList ? (
          <AllProducts
            originalProducts={originalProducts}
            products={products}
            setProducts={setProducts}
          />
        ) : (
          <CardList />
        )}
      </div>
    </>
  );
}
