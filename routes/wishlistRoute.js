const express = require("express");
const Wishlist = require("../models/wishlist.model");
const router = express.Router();

//post for user
router.post("/", async (req, res) => {
  const { productId, customerId } = req.body;

  const exists = await Wishlist.findOne({ productId, customerId });
  if (exists) return res.status(200).json({ msg: "already exists" });
  const add = await Wishlist.create({ productId, customerId });
  if (!add) return res.status(400).json({ msg: "not add to wishlist" });
  return res.status(200).json({ msg: "added to wishlist" });
});

//get for user id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Wishlist.find({ customerId: id });
    res.json(products);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  const foundn = await Wishlist.findOne({
    productId: productId,
    customerId: id,
  });
  if (foundn) {
    await Wishlist.deleteOne(foundn);
    return res.status(200).json({ msg: "success" });
  }
  return res.status(400).json({ msg: "not deleted" });
});

module.exports = router;
