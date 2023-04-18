import { TodoItem } from "../models/todoItem";

export function getAllTodos(): Promise<TodoItem[]> {
	return fetch('http://localhost:3000/api/todo', {
		method: 'GET'
	}).then(res => res.json())
}

export function getTodoById(id: string): Promise<TodoItem> {
	console.log('getTodoById id', id)
	return fetch(`http://localhost:3000/api/todo?id=643d9bb2d641914ac9947385`, {
		method: 'GET'
	}).then(res => res.json())
}

export function addTodo(text: string, category: string) {
	return fetch('http://localhost:3000/api/todo', {
		method: 'POST',
		body: JSON.stringify({
			text,
			category
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
}

export function updateTodo(todo: TodoItem) {
	return fetch('http://localhost:3000/api/todo', {
		method: 'PUT',
		body: JSON.stringify(todo),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
}

export function deleteTodo(id: string) {
	return fetch('http://localhost:3000/api/todo?id=${id}', {
		method: 'DELETE'
	}).then(res => res.json())
}