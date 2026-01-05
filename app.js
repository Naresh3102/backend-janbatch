const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MVC
// M - Model - Database Schema - About your table
// V - View - Frontend - React
// C - Controller - HTTP request and response

app.post("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });
});

mongoose
  .connect(
    "mongodb+srv://snaresh3102:Naresh123@cluster0.zvtj99e.mongodb.net/janbatch"
  )
  .then(() => {
    console.log("DB connected");
    app.listen(5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("Connection failed: ", err.message);
  });
