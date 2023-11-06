import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    // Create hashed password with salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Changing password to hashedPassword
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);

export default User;
