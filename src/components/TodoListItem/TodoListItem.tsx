import { TodoItem } from "../../models/todoItem";
import React from "react";
import styles from "./todoListItem.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TodoListItemProps {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onUpdate, onDelete }) => {
  const handleChange = async () => {
    onUpdate(todo);
  };

  const handleDelete = async () => {
    onDelete(todo);
  };

  return (
    <li
      className={`${styles.todoListItem} ${
        todo.completed ? styles.completed : styles.pending
      }`}
    >
      <input type="checkbox" onChange={handleChange} checked={todo.completed} />
      <label htmlFor={`todo-${todo._id}`}>{todo.text}</label>
      <div className={styles.actionButtonsWrapper}>
        <button className={styles.actionButton}>
          <Link href={`/todo/${todo._id}`}>
            <FontAwesomeIcon icon="pencil" />
          </Link>
        </button>
        <button onClick={handleDelete} className={styles.actionButton}>
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
