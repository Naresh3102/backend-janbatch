// Step 1
const mongoose = require("mongoose");

// Step 2
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "name should have minimum of 3 characters"],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: ["", "Email is invalid"],
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
  },
});

// Step 3
const User = mongoose.model("user", userSchema);

module.exports = User;
