import express from 'express';
import BookRoute from './routes/book.route';
import mongoose from 'mongoose';
import 'dotenv/config';

interface AppConfig {
    port?: number | string;
    startserver(): void;
    connecttoDB(): void;
    initializeRoutes(): void;
}

class App implements AppConfig {
    public app: express.Application;
    public port: number | string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.initializeRoutes();
        this.connecttoDB();
    }

    startserver(): void {
        this.app.listen(this.port, () => {
            console.log(`App is running on http://localhost:${this.port}`);
        });
    }

    initializeRoutes(): void {
        const bookRoute = new BookRoute();
        this.app.use('/api', bookRoute.router);
    }

    connecttoDB(): void {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/books";
        mongoose
            .connect(mongoURI)
            .then(() => {
                console.log("Connected to MongoDB at", mongoURI);
            })
            .catch((error) => {
                console.error("Error connecting to MongoDB:", error);
            });
    }
}

export default App;