import { Request, Response } from 'express';
import TodoService from '../service/todo.service';

class TodoController {
    createTodo = async (req: Request, res: Response) => {
        try {
            const todo = await TodoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    getTodos = async (req: Request, res: Response) => {
        try {
            const { search, completed, sortBy, order, page, limit } = req.query;

            const options = {
                search: search as string,
                filter: completed !== undefined ? { completed: completed === 'true' } : undefined,
                sort: sortBy ? { field: sortBy as string, order: (order === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc' } : undefined,
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10
            };

            const result = await TodoService.getTodos(options);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    updateTodo = async (req: Request, res: Response) => {
        try {
            const todo = await TodoService.updateTodo(req.params.id, req.body);
            if (!todo) {
                res.status(404).json({ message: 'Todo not found' });
                return;
            }
            res.status(200).json(todo);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }

    deleteTodo = async (req: Request, res: Response) => {
        try {
            const result = await TodoService.deleteTodo(req.params.id);
            if (!result) {
                res.status(404).json({ message: 'Todo not found' });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
    }
}

export default TodoController; 
