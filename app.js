const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./middlewares/errorHandling");
const authRouter = require("./routes/authRoutes");
const dotenv = require("dotenv");
const { protect } = require("./middlewares/authMiddlewares");

dotenv.config();
const app = express();

app.use(express.json());
// app.use(bodyParser()) - No need

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });
});

app.use("/api/auth", authRouter);
app.use("/api", protect, bookRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("Connection failed: ", err.message);
  });
