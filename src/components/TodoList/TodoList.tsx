import { TodoItem } from '../../models/todoItem'
import React from "react"
import styles from './TodoList.module.css'
import TodoListItem from '../TodoListItem/TodoListItem'

const TodoList = (props: { todos: TodoItem[] }) => {
	const { todos } = props
	
  return (
		<ul className={styles.todoList}>
			{todos.map((todo) => (
				<TodoListItem key={todo._id} todo={todo}></TodoListItem>
			))}
		</ul>
  )
}

export default TodoList