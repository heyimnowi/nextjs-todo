import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getFilteredTodoItems } from '../../data/dummy-data'
import { TodoItem } from '../../models/todoItem'
import styles from './Index.module.scss'
import TodoList from '../../components/TodoList'

export default function TodoFilteredPage() {
	const router = useRouter()

	const filterData = router.query.slug as string[]

	if (!filterData) {
		return <div>Invalid filter</div>
	}

	const [category, completed] = filterData

	if(category !== 'work' && category !== 'personal') {
		return <div>Invalid filter. Please adjust your URL.</div>
	}

	if (completed !== 'completed' && completed !== 'pending') {
		return <div>Invalid filter</div>
	}
		
  // const todos: TodoItem[]  = getFilteredTodoItems(category, completed === 'completed')
  const todos: TodoItem[]  = []

	if (!todos || todos.length === 0) {
		return <div>No todos found</div>
	}
  
  return (
    <Fragment>
      <h2>{category} filtered tasks</h2>
      <TodoList todos={todos}></TodoList>
    </Fragment>
  )
}
