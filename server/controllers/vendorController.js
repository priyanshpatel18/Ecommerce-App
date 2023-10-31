import Vendor from "../models/vendorModel.js";

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vendor
export const createVendor = async (req, res) => {
  const vendor = req.body;

  try {
    const newVendor = await Vendor.create(vendor);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a vendor by ID
export const updateVendor = async (req, res) => {
  const { id } = req.params;
  const updatedVendor = req.body;

  try {
    const result = await Vendor.findByIdAndUpdate(id, updatedVendor, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vendor by ID
export const deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Vendor.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
