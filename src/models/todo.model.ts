interface Itodo {
    id: number;
    title: string;
    completed: boolean;
}

export class Todo implements Itodo {
    id: number;
    title: string;
    completed: boolean;

    constructor(id: number, title: string, completed: boolean = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    updateTitle(newTitle: string): void {
        this.title = newTitle;
    }

    toggleCompletion(): void {
        this.completed = !this.completed;
    }
}

export default Todo;