// Step 1
const mongoose = require("mongoose");

// Step 2
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      // match: ["", "Email is invalid"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true } // createdAt and updatedAt
);

// Step 3
const User = mongoose.model("user", userSchema);

module.exports = User;
