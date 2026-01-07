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
    console.log(req.query);
    console.log(req.query.category.split(","));

    const pageNumber = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.size || 5);
    const skipNumber = (pageNumber - 1) * pageSize;

    const filter = {};

    if (req.query.minPage || req.query.maxPage) {
      filter.pages = {};
      if (req.query.minPage) filter.pages.$gte = parseInt(req.query.minPage);
      if (req.query.maxPage) filter.pages.$lte = parseInt(req.query.maxPage);
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseInt(req.query.maxPrice);
    }

    if (req.query.author) {
      filter.author = req.query.author;
    }

    const books = await Book.find(filter).skip(skipNumber).limit(pageSize);

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / pageSize);

    res.json({
      success: true,
      books,
      currentPage: pageNumber,
      pageSize,
      total: totalBooks,
      totalPages,
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
