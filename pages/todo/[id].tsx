import { useRouter } from 'next/router'
import { Fragment } from 'react';
import { getTodoItemById } from '../../dummy-data';

export default function IdPage() {
	const router = useRouter()
  const todoId = Number(router.query.id)
  const todo = getTodoItemById(todoId)

  if (!todo) {
    return <div>Todo not found</div>
  }

  return (
    <Fragment>
      <h1>The ID page: {todo?.id}</h1>
      <p>ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Category: {todo.category}</p>
      <p>Completed: {todo.completed}</p>
    </Fragment>
  )
}
 