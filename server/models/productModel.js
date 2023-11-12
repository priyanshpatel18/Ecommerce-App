import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
