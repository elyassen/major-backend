const express = require("express");
const connectDb = require("./db");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/CustomerRoute");
const orderRoute = require("./routes/orderRoute");
const wishlistRoute = require("./routes/wishlistRoute");
app.use(express.json());
app.use(cors());

connectDb();
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/customers", customerRoutes);
app.use("/order", orderRoute);
app.use("/wishlist", wishlistRoute);
app.get("/", (req, res) => {
  res.send("seller backend home page");
});

app.listen(3001, () => {
  console.log("listening to server 3001");
});
