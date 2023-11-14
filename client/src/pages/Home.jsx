import Navbar from "../components/Navbar.jsx";
import CardList from "../components/CardList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AllProducts from "../components/AllProducts.jsx";

export default function Home() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProductsList, setShowProductsList] = useState(false);
  
  useEffect(() => {
    axios
    .get("http://localhost:8080/products")
    .then((res) => {
      setOriginalProducts(res.data);
      setProducts(res.data);
    })
    .catch((err) => console.error(err));
  }, []);
  
  return (
    <>
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
