import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
import shoppingCart from "../assets/shoppingCart.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Loader from "./Loader.jsx";

export default function Navbar({
  setProducts,
  originalProducts,
  setShowProductsList,
}) {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchItems, setSearchItems] = useState("");
  const redirect = useNavigate();
  const [cartCount, setCartCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/user/cart", { withCredentials: true })
      .then((response) => {
        setCartCount(response.data.cartCount);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleUserBtnClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    try {
      handleLogOut();
      enqueueSnackbar("Successfully Logged Out", {
        variant: "success",
      });
      setShowDropdown(false);
    } catch (error) {
      setShowDropdown(false);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  function handleLogOut() {
    Cookies.remove("token");
    setIsLoggedin(false);
    setUserName("");
  }

  useEffect(() => {
    const decodeToken = () => {
      const accessToken = Cookies.get("token");

      if (accessToken) {
        const tokenParts = accessToken.split(".");

        if (tokenParts.length === 3) {
          const base64Payload = tokenParts[1];
          const decodedPayload = atob(base64Payload);
          const tokenData = JSON.parse(decodedPayload);
          setIsLoggedin(true);
          setUserName(tokenData.userName);
        } else {
          console.error("Invalid token format");
        }
      }
    };
    decodeToken();
  }, []);

  function Filter(e) {
    setShowProductsList(true);
    e.preventDefault();
    const filteredProducts = originalProducts.filter(
      (f) =>
        f.name.toLowerCase().includes(searchItems) ||
        f.description.toLowerCase().includes(searchItems)
    );
    setProducts(filteredProducts);
  }

  function handleCartIcon() {
    if (!isLoggedIn) {
      enqueueSnackbar("You need to Login First", { variant: "error" });
      return;
    }
    redirect("/cart");
  }

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <nav>
          <a href="/" onClick={() => setShowProductsList(false)}>
            <img src={logo} alt="logo" className="logo" />
          </a>
          <form action="/products" className="searchBar">
            <input
              type="text"
              placeholder="Search ShopHub.com"
              className="productSearch"
              required
              onChange={(e) => setSearchItems(e.target.value.toLowerCase())}
            />
            <button type="submit" className="submitBtn" onClick={Filter}>
              <img src={searchIcon} alt="search" className="searchIcon" />
            </button>
          </form>
          <div className="btnContainer">
            {isLoggedIn ? (
              <div className="userBtn" onClick={handleUserBtnClick}>
                {userName}
                {showDropdown && (
                  <div className="dropdown">
                    <button onClick={handleLogoutClick}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="loginBtn" to="/login">
                LOGIN
              </Link>
            )}

            <button className="shoppingCart" onClick={handleCartIcon}>
              <img src={shoppingCart} alt="cart" />
              <div>{cartCount || 0}</div>
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
