import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Products from "./pages/Products.jsx";
import ShowProduct from "./pages/ShowProduct.jsx";
import { useState } from "react";
import Cart from "./pages/Cart.jsx";

export default function App() {
  const [showProductsList, setShowProductsList] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              showProductsList={showProductsList}
              setShowProductsList={setShowProductsList}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products/category/:category"
          element={<Products setShowProductsList={setShowProductsList} />}
        />
        <Route
          path="/products/:productId"
          element={<ShowProduct setShowProductsList={setShowProductsList} />}
        />
        <Route
          path="/cart"
          element={<Cart setShowProductsList={setShowProductsList} />}
        />
      </Routes>
    </>
  );
}
