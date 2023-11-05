import Customer from "../models/customerModel.js";
import * as UserService from "../service/auth.js";
import bcrypt from "bcrypt";

// SignUp
export const SignUp = async (req, res) => {
  try {
    const newCustomer = req.body;
    // Find Email if Exists For Unique Emails
    const userEmail = await Customer.findOne({ email: newCustomer.email });
    if (userEmail) {
      res.status(400).send("Email Already Exists");
    } else {
      await Customer.create(newCustomer);
      res.status(201).json(newCustomer);
    }
  } catch (error) {
    res.status(400).json("THIS ERROR");
  }
};

// Login Customer
export const Login = async (req, res) => {
  // Get Values from Input
  const { email, password } = req.body;

  // Check if user exist
  const customer = await Customer.findOne({ email });
  // const customer = await Customer.findOne({ email, password });
  const passwordMatch = await bcrypt.compare(password, customer.password);

  if (!customer) {
    res.status(404).send("You need to Sign Up First");
  } else if (!passwordMatch) {
    res.status(401).send("Incorrect Password");
  } else {
    // Generate token
    const token = UserService.setUser(customer);
    res.cookie("uid", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ token: token });
  }
};
