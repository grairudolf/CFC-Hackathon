import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minLength: 2
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    imgUrl: {
        type: String,
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;