const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookISBN: {
        type: String,
        required: [true, "Book ISBN is not provided"],
    },
    bookName: {
        type: String,
        required: [true, "Book name is not provided"],
    },
    author: {
        type: [String],
        required: [true, "Book author is not provided"],
        maximumLength: 30,
    },
    genre: {
        type: String,
        required: [true, "Book genre is not provided"],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: String,
        default: 0,
        min: 1,
        max: 1000,
    },
    createdAt: {
        type: Date,
        default: Date().now,
    },

    // For array of objects
    // Orders: {
    //     type: [
    //         {
    //             orderId: Number,
    //             totalPrice: Number, 
    //         }
    //     ]
    // },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;