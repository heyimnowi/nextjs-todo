import Link from 'next/link'
import styles from '../../styles/HomePage.module.scss'

export default function TodoPage() {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false, category: 'work'}, 
    { id: 2, title: 'Todo 2', completed: true, category: 'personal' },
    { id: 3, title: 'Todo 3', completed: true, category: 'work' },
    { id: 4, title: 'Todo 4', completed: false, category: 'work' },
    { id: 5, title: 'Todo 5', completed: false, category: 'personal' },
    { id: 6, title: 'Todo 6', completed: true, category: 'personal' }
  ]
  
  return (
    <div className='container'>
      <h1>What's up, Nowi!</h1>
      <h2>Categories</h2>
      <p>Summary about categories</p>
      <h2>Today's tasks</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : 'pending'} >
            <input type={'checkbox'} />
            <Link href={{
              pathname: '/todo/[id]',
              query: { id: todo.id }
            }}>{todo.title}</Link>
          </li>
        ))}
      </ul>
      <button>+</button>
    </div>
  )
}
