const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");
const Orders = require("../models/Order.model");
const Order = require("../models/Order.model");

router.post("/", async (req, res) => {
  const { productId, customerId } = req.body;
  console.log(productId, customerId);

  const productIdArray = productId.map((id) => new Types.ObjectId(id));

  try {
    const order = await Orders.create({
      productId: productIdArray,
      customerId: customerId,
    });
    res.status(201).json({
      msg: "Order successfully created",
      status: "success",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.find({ customerId: id });
    if (!order) return res.status(200).json({ status: "failed", msg: "" });
    return res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ err: "err while getting order" });
  }
});

module.exports = router;
