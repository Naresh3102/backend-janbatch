const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A book must have a name"],
    minlength: [5, "Name must be atleast 5 characters."],
    maxlength: [100, "Name must be atmost 100 characters."],
  },
  author: {
    type: String,
    required: [true, "A author must have a name"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [5, "Rating must be atmost 5"],
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Price should be mentioned"],
    min: [0, "Price should be atleast 0"],
  },
  pages: {
    type: Number,
    required: [true, "A book must have page"],
    min: [100, "A book should have atleast 100 pages"],
  },
});

const Book = mongoose.model("Book", bookSchema); // books

module.exports = Book;
