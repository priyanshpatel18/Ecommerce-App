import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    axios
      .post(`https://shophub-five.vercel.app/user/login`, data)
      .then((response) => {
        // Set Token for User
        const { token } = response.data;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        Cookies.set("token", token, { expires: expirationDate });

        enqueueSnackbar("Welcome to ShopHub", {
          variant: "success",
        });
        redirect("/");
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data, { variant: "error" });
        if (err.response.status === 404) {
          redirect("/signup");
        }
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? <Loader isLoading={isLoading} /> : <></>}
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <form className="login-form" onSubmit={handleLogin}>
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
            <button className="signUpBtn">CREATE ACCOUNT</button>
          </Link>
        </div>
      </div>
    </>
  );
}
