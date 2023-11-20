import User from "../models/userModel.js";
import * as UserService from "../service/auth.js";
import bcrypt from "bcrypt";
import Product from "../models/productModel.js";

// SignUp
export const SignUp = async (req, res) => {
  try {
    const newUser = req.body;
    // Find Email if Exists For Unique Emails
    const userEmail = await User.findOne({ email: newUser.email });
    if (userEmail) {
      res.status(400).send("Email Already Exists");
    } else {
      await User.create(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// Login User
export const Login = async (req, res) => {
  // Get Values from Input
  const { email, password } = req.body;

  // Check if user exist and populate cart
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send("You need to Sign Up First");
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).send("Incorrect Password");
    return;
  } else {
    // Generate token
    const token = UserService.setUser(user);
    res.cookie("uid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ token: token, cartCount: user.cart.length });
    return;
  }
};

// Add Products to Users Cart
export const AddToCart = async (req, res) => {
  // Get Product Id from Params
  const { productId } = req.params;
  // Check for Valid User
  const token = req.cookies.token;
  if (!UserService.getUser(token)) {
    res.status(501).send("You need to Login First");
    return;
  }

  // Get User and add Product to Users Cart
  try {
    const userEmail = UserService.getUser(token).email;
    const loggedUser = await User.findOne({ email: userEmail });
    if (loggedUser.cart.includes(productId)) {
      return res.status(401).send("Product Already Exists in the Cart");
    }
    loggedUser.cart.push(productId);
    await loggedUser.save();
    res.status(201).send("Added to Cart");
  } catch (error) {
    res.status(401).send("Error Adding Product");
  }
};

// Get Cart Items
export const getCartItems = async (req, res) => {
  const token = req.cookies.token;
  const userObject = UserService.getUser(token);
  if (!userObject) {
    return;
  }
  const userEmail = userObject.email;
  try {
    const user = await User.findOne({ email: userEmail });
    const cartItems = user.cart;

    const products = await Product.find({ _id: { $in: cartItems } });
    res.status(201).json({ cartItems: products, cartCount: cartItems.length });
  } catch (error) {
    console.log(error);
  }
};
