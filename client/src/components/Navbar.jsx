import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
import shoppingCart from "../assets/shoppingCart.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import Loader from "./Loader";

export default function Navbar({ setProducts, setShowProductsList }) {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchItems, setSearchItems] = useState("");
  const redirect = useNavigate();
  const [cartCount, setCartCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://shophub-five.vercel.app/user/cart", {
        withCredentials: true,
      })
      .then((response) => {
        setCartCount(response.data.cartCount);
        console.log(response.data.cartCount);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    setIsLoading(true);
    axios
      .get("https://shophub-five.vercel.app/products")
      .then((res) => {
        setOriginalProducts(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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
    redirect("/");
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

  function handleSearchFilter(e) {
    setShowProductsList(true);
    setIsLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const filteredProducts = originalProducts.filter(
        (f) =>
          f.name.toLowerCase().includes(searchItems) ||
          f.description.toLowerCase().includes(searchItems)
      );
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 250);
  }

  function handleCartIcon() {
    if (!isLoggedIn) {
      enqueueSnackbar("You need to Login First", { variant: "error" });
      return;
    }
    redirect("/user/cart");
  }

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <></>}
      <nav>
        <a href="/" onClick={() => setShowProductsList(false)}>
          <img src={logo} alt="logo" className="logo" />
        </a>
        <form
          action="/products"
          className="searchBar"
          onSubmit={handleSearchFilter}
        >
          <input
            type="text"
            placeholder="Search ShopHub.com"
            className="productSearch"
            required
            onChange={(e) => setSearchItems(e.target.value.toLowerCase())}
          />
          <button type="submit" className="submitBtn">
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
    </>
  );
}
