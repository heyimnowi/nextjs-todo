import { ObjectId } from "mongodb";
import { TodoItem } from "../models/todoItem";

export function getAllTodos(): Promise<TodoItem[]> {
	return fetch('http://localhost:3000/api/todo', {
		method: 'GET'
	}).then(res => res.json())
}

export function getTodoById(id: string): Promise<TodoItem> {
	return fetch(`http://localhost:3000/api/todo?id=${id}`, {
		method: 'GET'
	}).then(res => res.json())
}

export function addTodo(todo: TodoItem) {
	return fetch('http://localhost:3000/api/todo', {
		method: 'POST',
		body: JSON.stringify(todo),
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

export function deleteTodo(id: ObjectId) {
	return fetch(`http://localhost:3000/api/todo?id=${id.toString()}`, {
		method: 'DELETE'
	}).then(res => res.json())
}