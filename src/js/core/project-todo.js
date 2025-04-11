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
  // Toggle the completed status
  todo.completed = !todo.completed;

  // Update UI if elements are provided
  if (taskElement && circleElement) {
    if (todo.completed) {
      // Add the animation class
      taskElement.classList.add("completed-animation");

      // Set the completion date
      todo.completedDate = new Date().toISOString(); // Store as ISO string for consistency

      // Wait for the animation to complete before removing the task
      setTimeout(() => {
        taskElement.remove(); // Remove the task from the DOM
      }, 300); // Match the duration of the animation (0.3s)
    } else {
      // If unchecking completion, remove the animation class and clear the completion date
      taskElement.classList.remove("completed-animation");
      delete todo.completedDate; // Remove the completion date
    }

    // Update the circle's appearance
    circleElement.classList.toggle("completed", todo.completed);
  }

  // Save the updated state to localStorage
  saveState();
}
