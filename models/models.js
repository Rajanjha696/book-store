const mongoose = require("mongoose");

const booksModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
});

const books = mongoose.model("books", booksModel);

module.exports = {
    books
};