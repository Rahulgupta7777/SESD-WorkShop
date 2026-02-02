import express from 'express'
import TodoRoute from './routes/todo.route'

const todoRoute = new TodoRoute()
class App {
    app: express.Application
    port: number | string = 8080;

    constructor() {
        this.app = express()

    }

    startserver() {
        this.app.listen(this.port, () => {
            console.log(`app is running on http://localhost:${this.port}`)
        })
    }
    initializeRoutes() {
        this.app.use('/', todoRoute.intializeRoutes)
    }
    updateroutes() {
        this.app.use('/:id', todoRoute.updateroute)
    }
    deleteroutes() {
        this.app.use('/:id', todoRoute.deleteroute)
    }

}
export default App