import { TodoItem } from '../models/todoItem'
import React from "react"
import styles from './TodoList.module.scss'
import TodoListItem from './TodoListItem'

const TodoList = (props: { todos: TodoItem[] }) => {
	const { todos } = props

  return (
		<ul className={styles.todoList}>
			{todos.map((todo) => (
				<TodoListItem key={todo.id} todo={todo}></TodoListItem>
			))}
		</ul>
  )
}

export default TodoList