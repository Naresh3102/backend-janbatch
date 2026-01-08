const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check existing account
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with the same email",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create account
    const user = await User.create({
      email,
      password: hashPassword,
    });

    res.status(201).json({
      user,
      message: "Registration done",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // Email check
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Password matching
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRESIN }
    );

    res.status(200).json({
      message: "Login success",
      token,
      email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
