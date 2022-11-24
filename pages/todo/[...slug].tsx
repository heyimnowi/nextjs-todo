import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { TodoItem } from '../../models/todoItem';
import TodoList from '../../components/TodoList';

function FilteredTodosPage() {
  const [loadedTodos, setLoadedTodos] = useState<TodoItem[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-todo-b2ca1-default-rtdb.firebaseio.com/todos.json', fetcher
  );

  useEffect(() => {
    debugger
    if (data) {
      const todos = [];

      for (const key in data) {
        todos.push({
					id: data[key].id,
					title: data[key].title,
					category: data[key].category,
					completed: data[key].completed
        });
      }

      setLoadedTodos(todos);
    }
  }, [data]);

  if (!loadedTodos || !filterData) {
    return <p className='center'>Loading...</p>;
  }

  const filteredCategory = filterData[0];
  const filteredCompleted = filterData[1];

  if (
    (filteredCategory !== 'work' && filteredCategory !== 'personal') ||
    (filteredCompleted !== 'completed' && filteredCompleted !== 'pending') ||
    error
  ) {
    return (
      <Fragment>
        <p>Invalid filter. Please adjust your values!</p>
      </Fragment>
    );
  }

  const filteredTodos = loadedTodos.filter((todo) => {
		const completed = filteredCompleted === 'completed'
    return (
      todo.category === filteredCategory &&
      todo.completed === completed
    );
  });

  if (!filteredTodos || filteredTodos.length === 0) {
    return (
      <Fragment>
        <p>No todos found for the chosen filter!</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2>{filteredCategory} filtered tasks</h2>
      <TodoList todos={filteredTodos}></TodoList>
    </Fragment>
  );
}

export default FilteredTodosPage;
