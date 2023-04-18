import { useState } from "react";
import { addTodo } from "../helpers/api-utils";
import { TodoItem } from "../models/todoItem";
import TodoForm from "../components/TodoForm/TodoForm";
import { Action } from "../models/action";
import { Category } from "../models/category";
import { useRouter } from "next/router";

export default function IdPage() {
  const router = useRouter();
  const [todo, setTodo] = useState<TodoItem>({
    text: "",
    category: Category.WORK,
    completed: false,
  });

  const validateFields = () => {
    if (!todo.text || !todo.category) {
      throw new Error("Please fill all fields");
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    validateFields();
    await addTodo(todo);
    router.push("/");
  };

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
      <h1>Create todo</h1>
      <TodoForm
        todo={todo}
        onHandleInputChange={handleInputChange}
        action={Action.CREATE}
        onSubmit={handleClick}
      ></TodoForm>
    </form>
  );
}
