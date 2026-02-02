import TodoModel, { ITodo } from '../models/todo.model';

interface FindAllOptions {
    search?: string;
    filter?: {
        completed?: boolean;
    };
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
    page?: number;
    limit?: number;
}

class TodoService {
    async createTodo(data: { title: string; description: string }) {
        const newTodo = new TodoModel(data);
        return await newTodo.save();
    }

    async getTodos(options: FindAllOptions = {}) {
        const query: any = {};

        // 1. Search
        if (options.search) {
            query.$or = [
                { title: { $regex: options.search, $options: 'i' } },
                { description: { $regex: options.search, $options: 'i' } }
            ];
        }

        // 2. Filter
        if (options.filter && options.filter.completed !== undefined) {
            query.completed = options.filter.completed;
        }

        // 3. Sort
        let sortOption: any = {};
        if (options.sort) {
            sortOption[options.sort.field] = options.sort.order === 'asc' ? 1 : -1;
        } else {
            sortOption = { createdAt: -1 }; // Default sort
        }

        // 4. Pagination
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        const data = await TodoModel.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await TodoModel.countDocuments(query);

        return { data, total, page, limit };
    }

    async updateTodo(id: string, data: Partial<ITodo>) {
        return await TodoModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteTodo(id: string) {
        return await TodoModel.findByIdAndDelete(id);
    }
}

export default new TodoService();