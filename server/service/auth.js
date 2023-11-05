import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

// Setting Token For User
export const setUser = (customer) => {
  return jwt.sign(
    {
      _id: customer._id,
      email: customer.email,
      userName: customer.customerName,
      password: customer.password,
    },
    SECRET_KEY
  );
};

// Getting Token From User
export const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, SECRET_KEY);
};
