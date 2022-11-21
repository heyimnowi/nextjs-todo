import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import CategoryCardList from '../../components/CategoryCardList';
import TodoList from '../../components/TodoList';
import styles from './Index.module.scss'
import { TodoItem } from '../../models/todoItem';

function TodoPage(props: { todos: TodoItem[] }) {
  const [todos, setTodos] = useState(props.todos);

  const { data, error } = useSWR(
    'https://nextjs-todo-b2ca1-default-rtdb.firebaseio.com/todos.json'
  );

  useEffect(() => {
    if (data) {
      const transformedTodos: TodoItem[] = [];

      for (const key in data) {
        transformedTodos.push({
          id: Number(key),
          title: data[key].title,
          category: data[key].category,
          completed: data[key].completed,
        });
      }

      setTodos(transformedTodos);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !todos) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <TodoList todos={todos}></TodoList>
      <button className={styles.buttonNew}>+</button>
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-todo-b2ca1-default-rtdb.firebaseio.com/todos.json'
  );
  const data = await response.json();

  const transformedTodos = [];

  for (const key in data) {
    transformedTodos.push({
      id: Number(key),
      title: data[key].title,
      category: data[key].category,
      completed: data[key].completed
    });
  }

  return { props: { todos: transformedTodos } };
}

export default TodoPage;