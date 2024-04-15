const express = require("express");
const Wishlist = require("../models/wishlist.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { productId, customerId } = req.body;

    const exists = await Wishlist.findOne({ productId, customerId });
    if (exists)
      return res
        .status(200)
        .json({ msg: "Product already exists in wishlist" });

    const added = await Wishlist.create({ productId, customerId });
    if (!added)
      return res.status(400).json({ msg: "Failed to add product to wishlist" });

    return res.status(200).json({ msg: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Wishlist.find({ customerId: id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
    const found = await Wishlist.findOne({ productId, customerId: id });
    if (found) {
      await Wishlist.deleteOne(found);
      return res.status(200).json({ msg: "Product removed from wishlist" });
    }
    return res.status(400).json({ msg: "Product not found in wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
