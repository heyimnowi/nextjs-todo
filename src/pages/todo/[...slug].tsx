import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { TodoItem } from "../../models/todoItem";
import TodoList from "../../src/components/TodoList";
import Head from "next/head";

function FilteredTodosPage() {
  const [loadedTodos, setLoadedTodos] = useState<TodoItem[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-todo-b2ca1-default-rtdb.firebaseio.com/todos.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const todos = [];

      for (const key in data) {
        todos.push({
          id: data[key].id,
          title: data[key].title,
          category: data[key].category,
          completed: data[key].completed,
        });
      }

      setLoadedTodos(todos);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>NextJS Todo App</title>
      <meta name="description" content="A list of filtered todos" />
    </Head>
  );

  if (!loadedTodos || !filterData) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }

  const filteredCategory = filterData[0];
  const filteredCompleted = filterData[1];

  if (
    (filteredCategory !== "work" && filteredCategory !== "personal") ||
    (filteredCompleted !== "completed" && filteredCompleted !== "pending") ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <p>Invalid filter. Please adjust your values!</p>
      </Fragment>
    );
  }

  const filteredTodos = loadedTodos.filter((todo) => {
    const completed = filteredCompleted === "completed";
    return todo.category === filteredCategory && todo.completed === completed;
  });

  pageHeadData = (
    <Head>
      <title>Filtered Todos</title>
      <meta name="description" content="A list of filtered todos" />
    </Head>
  );

  if (!filteredTodos || filteredTodos.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <p>No todos found for the chosen filter!</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageHeadData}
      <h2>{filteredCategory} filtered tasks</h2>
      <TodoList todos={filteredTodos}></TodoList>
    </Fragment>
  );
}

export default FilteredTodosPage;
