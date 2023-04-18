import { Fragment, useEffect, useState } from "react";
import CategoryCardList from "../components/CategoryCardList/CategoryCardList";
import TodoList from "../components/TodoList/TodoList";
import styles from "../styles/Index.module.css";
import { useRouter } from "next/router";
import { deleteTodo, getAllTodos, updateTodo } from "../helpers/api-utils";
import { TodoItem } from "../models/todoItem";

function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const router = useRouter();

  const handleCompleteTodo = async (todo: TodoItem) => {
    try {
      await updateTodo({ ...todo, completed: !todo.completed });
      setTodos((prevTodos) => {
        const updatedTodos = [...(prevTodos || [])];
        const todoIndex = updatedTodos.findIndex((t) => t._id === todo._id);
        updatedTodos[todoIndex] = { ...todo, completed: !todo.completed };
        return updatedTodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (todo: TodoItem) => {
    try {
      if (todo._id) {
        await deleteTodo(todo._id);
        setTodos((prevTodos) => {
          const updatedTodos = [...(prevTodos || [])];
          const todoIndex = updatedTodos.findIndex((t) => t._id === todo._id);
          updatedTodos.splice(todoIndex, 1);
          return updatedTodos;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleClick = () => {
    router.push("create");
  };

  return (
    <Fragment>
      <h1>What&lsquo;s up, Nowi!</h1>
      <h2>Categories</h2>
      <CategoryCardList todos={todos}></CategoryCardList>
      <h2>Today&lsquo;s tasks</h2>
      <TodoList
        todos={todos}
        onUpdate={handleCompleteTodo}
        onDelete={handleDeleteTodo}
      ></TodoList>
      <button onClick={handleClick} className={styles.buttonNew}>
        +
      </button>
    </Fragment>
  );
}

export default TodoPage;
