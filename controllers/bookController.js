const Book = require("../models/Book");

const createBook = async (req, res) => {
  try {
    const { name, price, rating, author, pages } = req.body;
    const newBook = await Book.create({
      name,
      pages,
      rating,
      author,
      price,
    });
    res.status(201).json({
      success: true,
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with Id : ${req.params.bookId}`,
      });
    }

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookData = req.body;

    const book = await Book.findByIdAndUpdate(bookId, bookData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with Id : ${req.params.bookId}`,
      });
    }

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with Id : ${req.params.bookId}`,
      });
    }

    res.status(204).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
