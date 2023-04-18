import { Fragment } from 'react';
import CategoryCardList from '../components/CategoryCardList/CategoryCardList';
import TodoList from '../components/TodoList/TodoList';
import styles from '../styles/Index.module.css';
import { getAllTodos } from '../helpers/api-utils';
import { useRouter } from 'next/router';

function TodoPage(props: { todos: any }) {
  const { todos } = props;
  const router = useRouter();

  const handleClick = () => {
    console.log('Clicked');
    router.push('new');
  }

  if (!todos) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <TodoList todos={todos}></TodoList>
      <button onClick={handleClick}
      className={styles.buttonNew}>+</button>
    </Fragment>
  );
}

export async function getStaticProps() {
  const todos = await getAllTodos();

  return {
    props: {
      todos: todos,
    },
    revalidate: 60
  }
}

export default TodoPage;