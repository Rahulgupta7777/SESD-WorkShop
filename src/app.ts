import express from 'express';
import BookRoute from './routes/book.route';
import connectDB from './config/db';
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
        connectDB();
    }
}

export default App;