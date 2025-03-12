import "../styles/main.css";

import { createTodo, createProject } from "./helpers.js";

// Create a default project
const defaultProject = createProject("Default Project");

// Add sample todos to the default project
defaultProject.todos.push(
  createTodo(
    "Commit to a worthy task",
    "Add interactivity for task completion.",
    "2025-03-15",
    "high"
  ),
  createTodo(
    "Refactor code",
    "Organize JavaScript into modules.",
    "2025-03-20",
    "medium"
  ),
  createTodo(
    "Style the app",
    "Apply steampunk-inspired design.",
    "2025-03-25",
    "low"
  )
);

// Render todos to the DOM
function renderTodos(project) {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";

  project.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-circle ${todo.completed ? "completed" : ""}"></span>
      ${todo.title}
    `;
    taskList.appendChild(li);
  });
}

// Call renderTodos to display the initial list of todos
renderTodos(defaultProject);
