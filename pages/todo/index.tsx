import { TodoItem } from '../../models/todoItem'
import CategoryCardList from '../../components/CategoryCardList'
import styles from './Index.module.scss'
import TodoListItem from '../../components/TodoListItem'

export default function TodoPage() {
  const todos: TodoItem[]  = [
    { id: 1, title: 'Todo 1', completed: false, category: 'work'}, 
    { id: 2, title: 'Todo 2', completed: true, category: 'personal' },
    { id: 3, title: 'Todo 3', completed: true, category: 'work' },
    { id: 4, title: 'Todo 4', completed: false, category: 'work' },
    { id: 5, title: 'Todo 5', completed: false, category: 'personal' },
    { id: 6, title: 'Todo 6', completed: true, category: 'personal' }
  ]
  
  return (
    <div className='container'>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <ul>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}></TodoListItem>
        ))}
      </ul>
      <button className={styles.buttonNew}>+</button>
    </div>
  )
}
