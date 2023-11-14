import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();

  async function handleSubmit() {
    const data = {
      userName,
      email,
      password,
    };

    axios
      .post(`http://localhost:8080/user/signup`, data)
      .then(() => {
        enqueueSnackbar("Account Created Successfully", {
          variant: "success",
        });
        redirect("/login");
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data, { variant: "error" });
        redirect("/signup");
      });
  }

  return (
    <>
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="login-form">
          <h2>Create Account</h2>
          <label htmlFor="userName">Your Name</label>
          <input
            autoFocus
            required
            type="text"
            value={userName}
            id="userName"
            placeholder="First Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="text"
            id="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            value={password}
            id="password"
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="loginBtn">
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </>
  );
}
