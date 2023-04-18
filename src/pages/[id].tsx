import { useEffect, useState } from "react";
import { getTodoById, updateTodo } from "../helpers/api-utils";
import { useRouter } from "next/router";
import { TodoItem } from "../models/todoItem";
import TodoForm from "../components/TodoForm/TodoForm";
import { Action } from "../models/action";

export default function IdPage() {
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodoById(router.query.id as string);
      setTodo(todo);
    };

    if (router.query.id) {
      fetchTodo();
    }
  }, [router.query]);

  const handleUpdate = async () => {
    try {
      if (todo && todo._id) {
        await updateTodo(todo);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!todo) {
    return <div>Todo not found</div>;
  }

  const handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTodo({
      ...todo,
      [name]: event.target.value,
    });
  };

  return (
    <form>
      <h1>Update todo</h1>
      <TodoForm
        todo={todo}
        onHandleInputChange={handleInputChange}
        onSubmit={handleUpdate}
        action={Action.UPDATE}
      ></TodoForm>
    </form>
  );
}
