const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./errorHandling");

const app = express();

app.use(express.json());
// app.use(bodyParser()) - No need

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });
});

app.use("/api", bookRoutes);

app.use(errorHandler);

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
