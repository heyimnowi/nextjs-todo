import Link from 'next/link'
import styles from '../../styles/HomePage.module.scss'

export default function TodoPage() {
  const todos = [{ id: 1, title: 'Todo 1' }, { id: 2, title: 'Todo 2' }]
  
  return (
    <div className='container'>
      <h1>What's up, Nowi!</h1>
      <h2>Today's tasks</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type={'checkbox'} />
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
