import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Signup() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();

  async function handleSubmit() {
    const data = {
      customerName,
      email,
      password,
    };

    setLoading(true);
    axios
      .post(`http://localhost:8080/customer/signup`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Account Created Successfully", {
          variant: "success",
        });
        redirect("/login");
      })
      .catch((err) => {
        setLoading(false);
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
          <label htmlFor="customerName">Your Name</label>
          <input
            autoFocus
            required
            type="text"
            value={customerName}
            id="customerName"
            placeholder="First Name"
            onChange={(e) => setCustomerName(e.target.value)}
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
