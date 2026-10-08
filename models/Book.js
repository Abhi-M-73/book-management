import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    publishedYear: {
        type: Number,
    },
    releaseDate: {
        type: Date,
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 0,
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
    },
    coverImage: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;