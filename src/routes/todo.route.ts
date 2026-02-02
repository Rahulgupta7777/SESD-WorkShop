import express, { Router } from "express";
// What you need to build:
// Create a full-fledged CRUD App backend (Other than Todo) implementing OOPs with complete operations:
// CreateGet (single + list)UpdateDeleteExtra features (add as many as possible)
// Search, filter, sorting, paginationValidation + clean error handlingBonus: authenticationClean OOP structure: controllers → services → repositories, proper classes/models

class TodoRoute {
  path: string = "/todos";
  router: Router = express.Router();
  intializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      res.send("hello world");
    });
  }
  getroute() {
    this.router.get(`${this.path}`, (req, res) => {
      res.send("get all todos");
    });
  }

  updateroute() {
    this.router.put(`${this.path}/:id`, (req, res) => {
      res.send("update todo");
    });
  }
  deleteroute() {
    this.router.delete(`${this.path}/:id`, (req, res) => {
      res.send("delete todo");
    });
  }
}

export default TodoRoute;
