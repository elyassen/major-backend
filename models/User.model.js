const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  s_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  s_phone: {
    type: String,
  },
  s_address: {
    type: String,
    required: true,
  },
  s_dob: {
    type: String,
    required: true,
  },
  s_password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
