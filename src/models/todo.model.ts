import mongoose from 'mongoose';
import { ITodo, TodoSchema } from '../schema/todo.schema';

const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);

export { ITodo };
export default TodoModel;