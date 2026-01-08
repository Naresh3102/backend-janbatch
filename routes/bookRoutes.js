// Step 1
const express = require("express");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect, authorize } = require("../middlewares/authMiddlewares");

// Step 2
const bookRouter = express.Router();

// Step 3
bookRouter.post("/books", createBook);

bookRouter.get("/books", getAllBooks);

bookRouter.get("/books/:bookId", getBookById);

bookRouter.put("/books/:bookId", authorize("ADMIN"), updateBook);

bookRouter.delete("/books/:bookId", authorize("ADMIN"), deleteBook);

// /books/1 == id = 1
// /books/100 == id = 100

// Step 4
module.exports = bookRouter;
