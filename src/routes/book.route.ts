import express, { Router } from "express";
import BookController from "../controllers/book.controller";

class BookRoute {
  public router: Router;
  private bookController: BookController;

  constructor() {
    this.router = Router();
    this.bookController = new BookController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/books", this.bookController.createBook);
    this.router.get("/books", this.bookController.getBooks);
    this.router.put("/books/:id", this.bookController.updateBook);
    this.router.delete("/books/:id", this.bookController.deleteBook);
  }
}

export default BookRoute;
