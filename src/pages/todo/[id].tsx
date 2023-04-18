import { Fragment, useEffect, useState } from "react";
import { getTodoById } from "../../helpers/api-utils";
import { useRouter } from "next/router";
import { TodoItem } from "../../models/todoItem";

export default function IdPage() {
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodoById(router.query.id as string);
      setTodo(todo);
    };
    fetchTodo();
  }, [router.query]);

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <Fragment>
      <h1>The ID page: {todo._id ? todo._id.toString() : ''}</h1>
      <p>ID: {todo._id ? todo._id.toString() : ''}</p>
      <p>Title: {todo.text}</p>
      <p>Category: {todo.category}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
    </Fragment>
  );
}
