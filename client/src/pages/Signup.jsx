import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Signup() {
  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <form className="login-form">
          <h2>Create Account</h2>
          <label htmlFor="name">Your Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="First and last name"
          />
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="At least 6 characters"
          />
          <button type="submit" className="loginBtn">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </>
  );
}
