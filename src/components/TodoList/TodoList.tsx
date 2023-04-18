import { TodoItem } from '../../models/todoItem'
import React, { useEffect, useState } from "react"
import styles from './TodoList.module.css'
import TodoListItem from '../TodoListItem/TodoListItem'
import { deleteTodo, getAllTodos, updateTodo } from '../../helpers/api-utils'

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
    const [todos, setTodos] = useState<TodoItem[]>();

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

    if (!todos) {
        return <p>Loading...</p>;
    }

    return (
        <ul className={styles.todoList}>
            {todos.map((todo) => (
                <TodoListItem
                    key={todo._id?.toString()}
                    todo={todo}
                    onUpdate={handleCompleteTodo}
                    onDelete={handleDeleteTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;
