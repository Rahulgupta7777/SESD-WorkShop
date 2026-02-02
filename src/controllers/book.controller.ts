import { Request, Response } from 'express';
import BookService from '../service/book.service';

class BookController {
    createBook = async (req: Request, res: Response) => {
        try {
            const book = await BookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    getBooks = async (req: Request, res: Response) => {
        try {
            const { search, sortBy, order, page, limit } = req.query;

            const options = {
                search: search as string,
                sort: sortBy ? { field: sortBy as string, order: (order === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc' } : undefined,
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10
            };

            const result = await BookService.getBooks(options);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    updateBook = async (req: Request, res: Response) => {
        try {
            const book = await BookService.updateBook(req.params.id as string, req.body);
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.status(200).json(book);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    deleteBook = async (req: Request, res: Response) => {
        try {
            const result = await BookService.deleteBook(req.params.id as string);
            if (!result) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}

export default BookController;
