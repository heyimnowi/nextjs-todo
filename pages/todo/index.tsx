import Link from 'next/link'
import styles from '../../styles/HomePage.module.css'

export default function TodoPage() {
  const todos = [{ id: 1, title: 'Todo 1' }, { id: 2, title: 'Todo 2' }]
  
  return (
    <div className={styles.container}>
      <h1>The Todo page</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={{
              pathname: '/todo/[id]',
              query: { id: todo.id }
            }}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
