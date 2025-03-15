import "../styles/main.css";

import {
  createTodo,
  toggleTodoCompletion,
  updateTodoPriority,
} from "./todos.js";
import { createProject, addTodoToProject } from "./projects.js";
import { renderProjects, populateProjectPicker } from "./dom.js";
import { initModal } from "./modal.js";

// Initialize app state
const projects = [createProject("Inbox")];

// Add sample todos to the default project
inbox.todos.push(
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

// Populate project picker and render initial projects
populateProjectPicker(projects);
renderProjects(projects);

// Initialize modal functionality
initModal(projects, renderProjects);
