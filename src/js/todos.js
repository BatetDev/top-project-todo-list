// Todo management logic

// Factory function for creating Todo tasks
export function createTodo(
  title,
  description,
  dueDate,
  priority,
  project = "Inbox"
) {
  return {
    title,
    description,
    dueDate,
    priority,
    project,
    completed: false,
  };
}

// Toggle the completion status of a todo
export function toggleTodoCompletion(todo) {
  todo.completed = !todo.completed;
}

// Update the priority of a todo
export function updateTodoPriority(todo, newPriority) {
  todo.priority = newPriority;
}
