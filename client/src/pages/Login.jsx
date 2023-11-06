import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();

  function handleLogin() {
    const data = {
      email,
      password,
    };

    setLoading(true);
    axios
      .post(`http://localhost:8080/user/login`, data)
      .then((response) => {
        // Set Token for User
        const { token } = response.data;
        Cookies.set("token", token, { expires: 7 });

        setLoading(false);
        enqueueSnackbar("Welcome to ShopHub", {
          variant: "success",
        });
        redirect("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(err.response.data, { variant: "error" });
        if (err.response.status === 404) {
          redirect("/signup");
        }
        console.log(err);
      });
  }

  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="login-form">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input
            autoFocus
            required
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="loginBtn">
            LOGIN
          </button>
        </div>
        <div className="signUpLink">
          <div className="title">
            <div id="line1" className="line"></div>
            <p>New to ShopHub?</p>
            <div id="line1" className="line"></div>
          </div>
          <Link to="/signup">
            <button className="signUpBtn">CREATE ACCOUNT</button>
          </Link>
        </div>
      </div>
    </>
  );
}
