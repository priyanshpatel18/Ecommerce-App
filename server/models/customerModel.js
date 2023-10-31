import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  customerName: {
    type: String,
    required: true,
    unique: true,
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

const Customer = model("Customer", customerSchema);

export default Customer;
