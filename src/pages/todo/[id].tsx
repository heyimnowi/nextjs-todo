import { Fragment } from "react";
import { getAllTodos, getTodoById } from "../../helpers/api-utils";

export default function IdPage(props: { selectedTodo: any; }) {
  const todo = props.selectedTodo;

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <Fragment>
      <h1>The ID page: {todo?.id}</h1>
      <p>ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Category: {todo.category}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
    </Fragment>
  );
}

export async function getStaticProps(context: { params: { id: string; }; }) {
  const id = context.params.id;

  const todo = await getTodoById(id);

  return {
    props: {
      selectedTodo: todo,
    },
  };
}

export async function getStaticPaths() {
  const allTodos = await getAllTodos();

  const paths = allTodos.map(todo => ({ params: { id: todo.id } }));

  console.log(paths);

  return {
    paths: paths,
    fallback: 'blocking'
  };
}
