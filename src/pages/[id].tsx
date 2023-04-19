import { useContext, useEffect, useState } from "react";
import { getTodoById, updateTodo } from "../helpers/api-utils";
import { useRouter } from "next/router";
import { TodoItem } from "../models/todoItem";
import TodoForm from "../components/TodoForm/TodoForm";
import { Action } from "../models/action";
import NotificationContext, { NotificationStatus } from "../store/notification-context";

export default function IdPage() {
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const fetchTodo = async () => {
    notificationCtx.showNotification({
      title: "Loading... ⏲️",
      message: "Fetching todo...",
      status: NotificationStatus.PENDING,
    });
    try {
      const todo = await getTodoById(router.query.id as string);
      setTodo(todo);
      notificationCtx.showNotification({
        title: "Success! 😊",
        message: "Todo fetched successfully!",
        status: NotificationStatus.SUCCESS,
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error! 😔",
        message: "Something went wrong!",
        status: NotificationStatus.ERROR,
      });
    }
  };

  useEffect(() => {
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
