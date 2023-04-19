import { TodoItem } from '../../models/todoItem'
import React from 'react'
import styles from './TodoList.module.css'
import TodoListItem from '../TodoListItem/TodoListItem'

interface TodoListProps {
    todos: TodoItem[]
    onUpdate: (todo: TodoItem) => void
    onDelete: (todo: TodoItem) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
	if (todos.length === 0) {
		return <p className={styles.todoListEmpty}>No todos found.</p>
	}

	return (
		<ul className={styles.todoList}>
			{todos.map((todo) => (
				<TodoListItem
					key={todo._id?.toString()}
					todo={todo}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	)
}

export default TodoList
