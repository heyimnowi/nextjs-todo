import { getTodos } from '../../dummy-data'
import { TodoItem } from '../../models/todoItem'
import CategoryCardList from '../../components/CategoryCardList'
import styles from './Index.module.scss'
import TodoList from '../../components/TodoList'
import { Fragment } from 'react'

export default function TodoPage() {
  const todos: TodoItem[]  = getTodos()
  
  return (
    <Fragment>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <TodoList todos={todos}></TodoList>
      <button className={styles.buttonNew}>+</button>
    </Fragment>
  )
}
