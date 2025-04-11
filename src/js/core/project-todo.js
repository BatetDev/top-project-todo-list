// core/project-todo.js

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
    completedDate: null, // Add a property for storing completion date
  };
}

// Function to add a todo to a project
export function addTodoToProject(project, todo) {
  project.todos.push(todo);
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
}
