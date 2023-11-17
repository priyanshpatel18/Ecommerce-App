import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Loader from "../components/Loader";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      userName,
      email,
      password,
    };

    axios
      .post(`http://localhost:8080/user/signup`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Account Created Successfully", {
          variant: "success",
        });
        redirect("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar(err.response.data, { variant: "error" });
        redirect("/signup");
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="login-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <form className="login-form" onSubmit={handleSubmit}>
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
            <button className="loginBtn">CREATE ACCOUNT</button>
          </form>
        </div>
      )}
    </>
  );
}
