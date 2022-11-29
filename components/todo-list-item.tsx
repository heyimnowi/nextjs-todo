import { TodoItem } from '../models/todoItem'
import Link from "next/link"
import React from "react"
import styles from './todoListItem.module.scss'

const TodoListItem = (props: { todo: TodoItem }) => {
	const { todo } = props
	const exploreLink = `/todo/${todo.id}`

  return (
		<li className={`${styles.todoListItem} ${todo.completed ? styles.completed : styles.pending}`}>
			<input type='checkbox' />
			<Link href={exploreLink}>{todo.title}</Link>
		</li>
  )
}

export default TodoListItem