import { TodoItem } from "./models/todoItem";

const todos: TodoItem[] = [
	{ id: 1, title: 'Todo 1', completed: false, category: 'work'}, 
	{ id: 2, title: 'Todo 2', completed: true, category: 'personal' },
	{ id: 3, title: 'Todo 3', completed: true, category: 'work' },
	{ id: 4, title: 'Todo 4', completed: false, category: 'work' },
	{ id: 5, title: 'Todo 5', completed: false, category: 'personal' },
	{ id: 6, title: 'Todo 6', completed: true, category: 'personal' }
]

export function getTodos() {
	return todos
}

export function getTodoItemById(id: number): TodoItem | undefined {
	return todos.find((todo) => todo.id === id)
}