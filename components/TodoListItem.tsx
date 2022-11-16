import { TodoItem } from '../models/todoItem'
import Link from "next/link"
import React from "react"
import styles from './todoListItem.module.scss'

const TodoListItem = (props: { todo: TodoItem }) => {
  return (
		<li className={`${styles.todoListItem} ${props.todo.completed ? styles.completed : styles.pending}`}>
			<input type='checkbox' />
			<Link href={{
				pathname: '/todo/[id]',
				query: { id: props.todo.id }
			}}>{props.todo.title}</Link>
		</li>
  )
}

export default TodoListItem