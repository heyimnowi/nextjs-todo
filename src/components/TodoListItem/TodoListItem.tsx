import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TodoItem } from '../../models/todoItem'
import Link from 'next/link'
import React from 'react'
import styles from './TodoListItem.module.css'

interface TodoListItemProps {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onUpdate, onDelete }) => {
	const handleChange = async () => {
		onUpdate(todo)
	}

	const handleDelete = async () => {
		onDelete(todo)
	}

	return (
		<li
			className={`${styles['todo-list-item']} ${
				todo.completed ? styles.completed : styles.pending
			}`}
		>
			<input type="checkbox" onChange={handleChange} checked={todo.completed} />
			<label htmlFor={`todo-${todo._id}`}>{todo.text}</label>
			<div className={styles['action-buttons-wrapper']}>
				<button className={styles['action-button']}>
					<Link href={`/${todo._id}`}>
						<FontAwesomeIcon icon={faPencil} />
					</Link>
				</button>
				<button onClick={handleDelete} className={styles['action-button']}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</li>
	)
}

export default TodoListItem
