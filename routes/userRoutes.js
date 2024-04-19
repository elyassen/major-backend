const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/addseller", async (req, res) => {
  try {
    const { s_name, email, s_phone, s_address, s_dob, s_password } = req.body;

    if (!s_name || !email || !s_phone || !s_address || !s_dob || !s_password) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "email already taken" });
    }

    const newUser = await User.create({
      s_name,
      email,
      s_phone,
      s_address,
      s_dob,
      s_password,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const userfound = await User.findOne({ email: user.email });
    if (!userfound)
      return res.status(401).json({ err: "user email not found" });
    if (userfound.s_password != user.s_password) {
      return res.status(401).json({ err: "invalid creds" });
    }
    return res.status(200).json(userfound);
  } catch (e) {
    res.status(500).json({ err: "internal server error" });
  }
});

router.get("/getsellerinfo", async (req, res) => {
  try {
    const seller = await User.find({});
    res.json(seller);
  } catch (e) {
    res.status(500).json({ err: "internal server error" });
  }
});

router.post("/seller", async (req, res) => {
  try {
    const { seller } = req.body;
    const sellerInfo = await User.find({ _id: seller });
    if (!sellerInfo) return res.status(400).json({ err: "not found" });
    return res.status(200).json(sellerInfo);
  } catch (e) {
    res.status(500).json({ err: "internal server error" });
  }
});

module.exports = router;
