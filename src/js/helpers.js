// Factory function for creating Todo tasks
export function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
}

// Factory function for creating Projects
export function createProject(name) {
  return {
    name,
    todos: [],
  };
}
