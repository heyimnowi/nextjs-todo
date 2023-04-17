import { TodoItem } from "../src/models/todoItem";

export function getFilteredTodoItems(todos: TodoItem[], category: string, completed: boolean): TodoItem[] {
	return todos.filter((todo) => todo.category === category && todo.completed === completed)
}