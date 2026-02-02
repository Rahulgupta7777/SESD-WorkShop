import { Schema } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    publishedDate: string;
    isbn: string;
    pages: number;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    pages: { type: Number, required: true }
});

export default BookSchema;
