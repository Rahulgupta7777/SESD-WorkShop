import express, { Router } from "express";
import TodoController from "../controllers/todo.controller";

class TodoRoute {
  public router: Router;
  private todoController: TodoController;

  constructor() {
    this.router = Router();
    this.todoController = new TodoController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/todos", this.todoController.createTodo);
    this.router.get("/todos", this.todoController.getTodos);
    this.router.put("/todos/:id", this.todoController.updateTodo);
    this.router.delete("/todos/:id", this.todoController.deleteTodo);
  }
}

export default TodoRoute;
