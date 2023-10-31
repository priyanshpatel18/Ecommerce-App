import Customer from "../models/customerModel.js";

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    await Customer.create(newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Read Customer
export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Customer.findById(id);
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params.id;
    const doc = await Customer.findOneAndDelete(id);
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
