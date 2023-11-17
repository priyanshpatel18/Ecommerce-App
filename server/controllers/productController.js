import Product from "../models/productModel.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    await Product.create(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Read Products
export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(201).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params.id;
    const doc = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params.id;
    const doc = await Product.findOneAndDelete({ _id: productId });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
