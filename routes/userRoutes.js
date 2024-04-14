const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/addseller", async (req, res) => {
  const user = req.body;
  const emailExists = await User.findOne({ email: user.email });
  if (emailExists) return res.send("Email exists");
  const newuser = await User.create(user);
  res.json(newuser);
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const userfound = await User.findOne({ email: user.email });
  if (!userfound) return res.status(401).json({ err: "user email not found" });
  if (userfound.s_password != user.s_password) {
    return res.status(401).json({ err: "invalid creds" });
  }
  return res.status(200).json(userfound);
});

router.get("/", async (req, res) => {
  const seller = await User.find({});
  res.json(seller);
});

router.post("/seller", async (req, res) => {
  const { seller } = req.body;
  const sellerInfo = await User.find({ _id: seller });
  if (!sellerInfo) return res.status(400).json({ err: "not found" });
  return res.status(200).json(sellerInfo);
});

module.exports = router;
