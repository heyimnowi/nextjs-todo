import { TodoItem } from "../models/todoItem";

export function getTodoItemById(todos: TodoItem[], id: number): TodoItem | undefined {
	return todos.find((todo) => todo.id === id)
}

export function getFilteredTodoItems(todos: TodoItem[], category: string, completed: boolean): TodoItem[] {
	return todos.filter((todo) => todo.category === category && todo.completed === completed)
}