import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <form className="login-form">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input required type="password" name="password" id="password" />
          <button type="submit" className="loginBtn">
            LOGIN
          </button>
        </form>
        <div className="signUpLink">
          <div className="title">
            <div id="line1" className="line"></div>
            <p>New to ShopHub?</p>
            <div id="line1" className="line"></div>
          </div>
          <Link to="/signup">
            <button type="submit" className="signUpBtn">
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
