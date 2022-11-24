export async function getAllTodos() {
  const response = await fetch('https://nextjs-todo-b2ca1-default-rtdb.firebaseio.com/todos.json');
  const data = await response.json();

  const todos = [];

  for (const key in data) {
    todos.push({
      id: data[key].id,
      title: data[key].title,
      category: data[key].category,
      completed: data[key].completed
    });
  }

  return todos;
}

export async function getTodoById(id: string) {
  const allTodos = await getAllTodos();
  return allTodos.find((todo) => todo.id === id);
}

export async function getFilteredTodos(category: string, completed: boolean) {
  const allTodos = await getAllTodos();

  let filteredTodos = allTodos.filter((todo) => {
    return todo.category === category && todo.completed === completed;
  });

  return filteredTodos;
}
