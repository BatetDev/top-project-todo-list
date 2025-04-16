// core/project-todo.js

import { saveState } from "./state.js";

// Factory function to create a project
export function createProject(name) {
  return {
    name,
    todos: [],
  };
}

// Factory function to create a todo
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
    completedDate: null,
  };
}

// Function to add a todo to a project
export function addTodoToProject(project, todo) {
  project.todos.push(todo);
}

// Toggle the completion status of a todo
export function toggleTaskCompletion(todo, taskElement, circleElement) {
  todo.completed = !todo.completed;

  // Update UI if elements are provided
  if (taskElement && circleElement) {
    if (todo.completed) {
      taskElement.classList.add("completed-animation");

      // Set the completion date
      todo.completedDate = new Date().toISOString();

      // Wait for the animation to complete before removing the task
      setTimeout(() => {
        taskElement.remove();
      }, 300); // Match the duration of the animation (0.3s)
    } else {
      // If unchecking completion, remove the animation class and clear the completion date
      taskElement.classList.remove("completed-animation");
      delete todo.completedDate; // Remove the completion date
    }

    // Update the circle's appearance
    circleElement.classList.toggle("completed", todo.completed);
  }

  saveState(); // Ensure state is persisted after toggling
}
