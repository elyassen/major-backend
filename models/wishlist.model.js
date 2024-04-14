const mongoose = require("mongoose");
const Product = require("./Product.model");

const wishlistSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
