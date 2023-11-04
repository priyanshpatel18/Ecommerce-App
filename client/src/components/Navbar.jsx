import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
import shoppingCart from "../assets/shoppingCart.png";

export default function Navbar() {
  return (
    <>
      <nav>
        <a href="/">
          <img src={logo} alt="logo" className="logo" />
        </a>
        <form action="/products" className="searchBar">
          <input
            type="text"
            placeholder="Search ShopHub.com"
            className="productSearch"
            required
          />
          <button type="submit" className="submitBtn">
            <img src={searchIcon} alt="search" className="searchIcon" />
          </button>
        </form>
        <div className="btnContainer">
          <Link className="loginBtn" to="/login">
            LOGIN
          </Link>
          <button className="shoppingCart">
            <img src={shoppingCart} alt="cart" />
            <div>10</div>
          </button>
        </div>
      </nav>
    </>
  );
}
