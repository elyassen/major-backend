const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

router.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.post("/sellerlist", async (req, res) => {
  const { id } = req.body;
  const productlist = await Product.find({ seller: id });
  if (!productlist) return res.status(400).json({ err: "no products founds" });
  res.status(200).json(productlist);
});

router.post("/product", async (req, res) => {
  const data = req.body;

  try {
    // Validate 'data' here (e.g., check required fields)

    const newProduct = await Product.create(data);

    if (newProduct) {
      console.log("data posted");
      return res
        .status(200)
        .json({ success: true, message: "Product saved in database" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to save product",
      error: error.message,
    });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
});

router.get("/productdes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    res.json(product);
  } catch (e) {
    res.json({ err: e });
  }
});

module.exports = router;
