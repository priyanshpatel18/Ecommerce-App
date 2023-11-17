import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/user/cart", { withCredentials: true })
      .then((response) => {
        setCartItems(response.data.cartItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <> </>}
      <Navbar />
      <div className="cartContainer">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => <p key={index}>{item.name}</p>)
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </>
  );
}
