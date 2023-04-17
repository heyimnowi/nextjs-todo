import { Fragment } from 'react'
import { getAllTodos } from '../helpers/api-utils'
import CategoryCardList from '../components/CategoryCardList/CategoryCardList';
import TodoList from '../components/TodoList/TodoList';
import styles from '../styles/Index.module.css'

function TodoPage(props: { todos: any }) {
  const { todos } = props;

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
  const todos = await getAllTodos()

  return {
    props: {
      todos: todos,
    },
    revalidate: 60
  }
}

export default TodoPage;