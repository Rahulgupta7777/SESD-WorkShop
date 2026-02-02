import BookModel, { IBookModel } from '../models/book.model';

interface FindAllOptions {
    search?: string;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
    page?: number;
    limit?: number;
}

class BookService {
    async createBook(data: { title: string; author: string; publishedDate: string; isbn: string; pages: number }) {
        const newBook = new BookModel(data);
        return await newBook.save();
    }

    async getBooks(options: FindAllOptions = {}) {
        const query: any = {};

        // 1. Search
        if (options.search) {
            query.$or = [
                { title: { $regex: options.search, $options: 'i' } },
                { author: { $regex: options.search, $options: 'i' } }
            ];
        }

        // 2. Sort
        let sortOption: any = {};
        if (options.sort) {
            sortOption[options.sort.field] = options.sort.order === 'asc' ? 1 : -1;
        } else {
            sortOption = { createdAt: -1 }; // Default sort
        }

        // 3. Pagination
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        const data = await BookModel.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await BookModel.countDocuments(query);

        return { data, total, page, limit };
    }

    async updateBook(id: string, data: Partial<IBookModel>) {
        return await BookModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBook(id: string) {
        return await BookModel.findByIdAndDelete(id);
    }
}

export default new BookService();