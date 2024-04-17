const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/sellerlist", async (req, res) => {
  try {
    const { id } = req.body;
    const productlist = await Product.find({ seller: id });
    if (!productlist || productlist.length === 0) {
      return res.status(404).json({ err: "No products found for this seller" });
    }
    res.status(200).json(productlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/product", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newProduct = await Product.create(data);

    if (newProduct) {
      console.log("Data posted");
      return res
        .status(201)
        .json({ success: true, message: "Product saved in database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/productdes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
