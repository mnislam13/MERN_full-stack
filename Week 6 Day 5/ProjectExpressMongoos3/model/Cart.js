const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required:true,
        },

        books: 
        [
            {
                _id:false,
                book: {
                    type: mongoose.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },
                quantity: Number,
            },
        ],
        total: { type:Number, required: true, default: 0 },
        checkoutStatus: { type:Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;