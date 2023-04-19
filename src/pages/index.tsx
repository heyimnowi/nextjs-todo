import { useEffect, useState, useContext } from 'react'
import CategoryCardList from '../components/CategoryCardList/CategoryCardList'
import TodoList from '../components/TodoList/TodoList'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router'
import { deleteTodo, getAllTodos, updateTodo } from '../helpers/api-utils'
import { TodoItem } from '../models/todoItem'
import NotificationContext, { NotificationStatus } from '../store/notification-context'

function TodoPage() {
	const [todos, setTodos] = useState<TodoItem[]>([])
	const router = useRouter()
	const notificationCtx = useContext(NotificationContext)

	const handleCompleteTodo = async (todo: TodoItem) => {
		notificationCtx.showNotification({
			title: 'Loading... ⏲️',
			message: 'Updating todo...',
			status: NotificationStatus.PENDING,
		})
		try {
			await updateTodo({ ...todo, completed: !todo.completed })
			setTodos((prevTodos) => {
				const updatedTodos = [...(prevTodos || [])]
				const todoIndex = updatedTodos.findIndex((t) => t._id === todo._id)
				updatedTodos[todoIndex] = { ...todo, completed: !todo.completed }
				return updatedTodos
			})
			notificationCtx.showNotification({
				title: 'Success! 😊',
				message: 'Todo updated successfully!',
				status: NotificationStatus.SUCCESS,
			})
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error! 😔',
				message: 'Something went wrong!',
				status: NotificationStatus.ERROR,
			})
		}
	}

	const handleDeleteTodo = async (todo: TodoItem) => {
		notificationCtx.showNotification({
			title: 'Loading... ⏲️',
			message: 'Deleting todo...',
			status: NotificationStatus.PENDING,
		})
		try {
			if (todo._id) {
				await deleteTodo(todo._id)
				setTodos((prevTodos) => {
					const updatedTodos = [...(prevTodos || [])]
					const todoIndex = updatedTodos.findIndex((t) => t._id === todo._id)
					updatedTodos.splice(todoIndex, 1)
					return updatedTodos
				})
				notificationCtx.showNotification({
					title: 'Success! 😊',
					message: 'Todo deleted successfully!',
					status: NotificationStatus.SUCCESS,
				})
			}
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error! 😔',
				message: 'Something went wrong!',
				status: NotificationStatus.ERROR,
			})
		}
	}

	const fetchTodos = async () => {
		notificationCtx.showNotification({
			title: 'Loading... ⏲️',
			message: 'Fetching todos...',
			status: NotificationStatus.PENDING,
		})
		try {
			const todos = await getAllTodos()
			setTodos(todos)
			notificationCtx.showNotification({
				title: 'Success! 😊',
				message: 'Todos fetched successfully!',
				status: NotificationStatus.SUCCESS,
			})
		} catch (error) {
			notificationCtx.showNotification({
				title: 'Error! 😔',
				message: 'Something went wrong!',
				status: NotificationStatus.ERROR,
			})
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [])

	const handleClick = () => {
		router.push('create')
	}

	return (
		<>
			<h1>What&lsquo;s up, Nowi!</h1>
			<h2>Categories</h2>
			<CategoryCardList todos={todos}></CategoryCardList>
			<h2>Today&lsquo;s tasks</h2>
			<TodoList
				todos={todos}
				onUpdate={handleCompleteTodo}
				onDelete={handleDeleteTodo}
			></TodoList>
			<button onClick={handleClick} className={styles.buttonNew}>
        +
			</button>
		</>
	)
}

export default TodoPage
