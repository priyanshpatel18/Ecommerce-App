import Customer from "../models/customerModel.js";
import * as UserService from "../service/auth.js";

// SignUp
export const SignUp = async (req, res) => {
  try {
    const newCustomer = req.body;
    await Customer.create(newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Login Customer
export const Login = async (req, res) => {
  // Get Values from Input
  const { email, password } = req.body;

  // Check if user exist
  const customerEmail = await Customer.findOne({ email });
  const customer = await Customer.findOne({ email, password });

  if (!customerEmail) {
    res.status(404).send("Please Sign Up");
  } else if (!customer) {
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
