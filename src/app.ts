import express from 'express'
import TodoRoute from './routes/todo.route'
import mongoose from 'mongoose'

interface AppConfig {
    port?: number | string
    startserver(): void
    connecttoDB(): void
    initializeRoutes(): void
}

class App {
    app: express.Application
    port: number | string = 8080;

    constructor() {
        this.app = express()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.initializeRoutes()
        this.connecttoDB()

    }

    startserver() : void{
        this.app.listen(this.port, () => {
            console.log(`app is running on http://localhost:${this.port}`)
        })
    }
    initializeRoutes() : void{
        const todoRoute = new TodoRoute()
        this.app.use('/api', todoRoute.router)
    }
    connecttoDB():void { 
        mongoose
            .connect("mongodb://localhost:27017/todos")
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB:", error);
            });
        }
}
export default App