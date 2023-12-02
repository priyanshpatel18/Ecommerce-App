import jwt from "jsonwebtoken";

// Setting Token For User
export const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

// Getting Token From User
export const getUser = (token) => {
  if (!token) return null;
  return jwt.verify(token, process.env.SECRET_KEY);
};
