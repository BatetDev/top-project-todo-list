// project-todo.js
// create and manage projects and todos

import { saveState } from "./state";

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
export function toggleTaskCompletion(todo, taskElement, circleElement) {
  // Toggle data
  todo.completed = !todo.completed;

  // Update UI if elements are provided
  if (taskElement && circleElement) {
    taskElement.classList.toggle("completed", todo.completed);
    circleElement.classList.toggle("completed", todo.completed);
  }

  // Save the update state to localStorage
  saveState();

  return todo.completed;
}

// Update the priority of a todo
export function updateTodoPriority(todo, newPriority) {
  todo.priority = newPriority;
}
