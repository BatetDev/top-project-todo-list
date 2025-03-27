// project-todo.js
// create and manage projects and todos

// Factory function for creating projects
export function createProject(name) {
  return {
    name,
    todos: [],
  };
}

// Add a todo to a project's todos array
export function addTodoToProject(project, todo) {
  project.todos.push(todo);
}

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
