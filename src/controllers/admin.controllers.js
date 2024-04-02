const Product = require("../models/products.model");
const User = require("../models/users.models");

// Get All Products -->
const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No approved products found" });
    }
    return res
      .status(200)
      .json({ message: "All approved product fetched", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "err " + error });
  }
};

// Get All Pending Products -->
const handleGetAllPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "pending" }).sort({
      createdAt: "desc",
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No pending products found" });
    }
    return res
      .status(200)
      .json({ message: "All pending product fetched", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "err " + error });
  }
};

// Aprrove The Products -->
const handleApproveProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = Product.findById(id);
    if (!product)
      return res
        .status(200)
        .json({ message: "No product found matching the id" });
    product = await Product.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: `${product.name}'s status updtaed `, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "err " + error });
  }
};

// Get All Users -->
const handleGetAllUsers = async (req, res) => {
  try {
    let user = await User.find({});
    if (!user) return res.send({ message: "No user found" });
    return res
      .status(200)
      .json({ message: "All user fetched successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "err " + error });
  }
};

module.exports = {
  handleGetAllProducts,
  handleGetAllPendingProducts,
  handleApproveProduct,
  handleGetAllUsers,
};
