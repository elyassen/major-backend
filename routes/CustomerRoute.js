const express = require("express");
const Customer = require("../models/Customer.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const customer = req.body;
  try {
    const emailexists = await Customer.findOne({ email: customer.email });
    console.log(emailexists);
    if (emailexists) {
      return res.status(400).json({ msg: "Email already taken" });
    }
    const added = await Customer.create(customer);
    if (!added) {
      return res.status(400).json({ msg: "Customer not created" });
    }
    return res.status(200).json({ msg: "Success", user: added });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await Customer.findOne({ email: email });
    if (!exists) {
      return res
        .status(400)
        .json({ msg: "User doesn't exist, please sign up" });
    }
    if (exists.password === password) {
      return res.status(200).json({ msg: "Logged in", user: exists });
    }
    return res.status(400).json({ msg: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
