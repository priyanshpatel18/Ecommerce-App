import User from "../models/userModel.js";
import * as UserService from "../service/auth.js";
import bcrypt from "bcrypt";

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

  // Check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send("You need to Sign Up First");
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

    res.status(200).json({ token: token });
  }
};
