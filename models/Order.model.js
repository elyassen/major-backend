const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Product",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
