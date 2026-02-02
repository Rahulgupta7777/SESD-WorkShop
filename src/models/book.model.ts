import mongoose, { Document } from 'mongoose';
import BookSchema, { IBook } from '../schema/book.schema';

export interface IBookModel extends IBook, Document { }

const BookModel = mongoose.model<IBookModel>('Book', BookSchema);

export default BookModel;