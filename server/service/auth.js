import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

// Setting Token For User
export const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      password: user.password,
    },
    SECRET_KEY
  );
};

// Getting Token From User
export const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, SECRET_KEY);
};
