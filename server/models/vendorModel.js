import { Schema, model, mongoose } from "mongoose";

const vendorSchema = new Schema({
  name: {
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
  products: {
    type: [String],
    required: true,
  },
});

const Vendor = model("Vendor", vendorSchema);

export default Vendor;
