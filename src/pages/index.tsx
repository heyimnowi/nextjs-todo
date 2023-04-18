import { Fragment } from 'react';
import CategoryCardList from '../components/CategoryCardList/CategoryCardList';
import TodoList from '../components/TodoList/TodoList';
import styles from '../styles/Index.module.css';
import { useRouter } from 'next/router';
import { TodoItem } from '../models/todoItem';

function TodoPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('new');
  }

  return (
    <Fragment>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <TodoList />
      <button onClick={handleClick}
      className={styles.buttonNew}>+</button>
    </Fragment>
  );
}

export default TodoPage;