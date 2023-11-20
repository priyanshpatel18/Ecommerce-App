import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import AllProducts from "../components/AllProducts";

export default function Cart({ setShowProductsList, showProductsList }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    // Fetch user's cart items
    const fetchUserCart = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/user/cart", {
          withCredentials: true,
        });
        setCartItems(response.data.cartItems);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    // Fetch original products
    const fetchOriginalProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/products");
        setOriginalProducts(res.data);
        setProducts(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    // Call both functions in parallel
    Promise.all([fetchUserCart(), fetchOriginalProducts()]);
  }, []);

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <> </>}
      <Navbar
        setShowProductsList={setShowProductsList}
        setProducts={setProducts}
      />
      {showProductsList ? (
        <AllProducts products={products} setProducts={setProducts} />
      ) : (
        <div className="cartContainer">
          <h1>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="cartItem" key={index}>
                <div className="imageContainer">
                  <img src={item.imageUrl} alt="thumbnail" />
                </div>
                <div className="detailsContainer">
                  <div>
                    <h1 className="cartItemName">{item.name}</h1>
                    <p className="cartItemDescription">{item.description}</p>
                    <div className="btnContainer">
                      <div className="quantity">
                        <label for="quantityDropdown">Select quantity:</label>
                        <select id="quantityDropdown" name="quantity">
                          <option value="0">0</option>
                          <option value="1" selected>
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="deleteItem">Delete</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
      )}
    </>
  );
}
