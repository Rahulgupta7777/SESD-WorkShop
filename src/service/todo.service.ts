import todo from '../models/todo.model'

class TodoService {
    async createTodo(data: { title: string; description: string }) {
        const newTodo = new todo(data)
        return await newTodo.save()
    }

 async getTodos() {
        return await todo.find()
    }

    async updateTodo(id: string, data: { title?: string; description?: string }) {
        return await todo.findByIdAndUpdate(id, data, { new: true })
    }

    async deleteTodo(id: string) {
        return await todo.findByIdAndDelete(id)
    }
}

export default TodoService;