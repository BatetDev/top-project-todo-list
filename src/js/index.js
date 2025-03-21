/* INDEX */
import "../styles/main.css";
import {
  createTodo,
  toggleTodoCompletion,
  updateTodoPriority,
} from "./todos.js";
import { createProject, addTodoToProject } from "./projects.js";
import { renderProjects, populateProjectPicker } from "./dom.js";
import { initModal } from "./modal.js";
import { loadProjects, saveProjects } from "./storage.js";
import {
  saveState,
  initializeState,
  getProjects,
  addProject,
} from "./state.js";

// Initialize app state
initializeState(); // Load projects from localStorage or set default state

// Get the centralized projects array
let projects = getProjects();

// Add default project ("Inbox") only if no projects exist
if (projects.length === 0) {
  const inboxProject = createProject("Inbox");
  addProject(inboxProject); // Add the default project to the centralized state
  projects = getProjects(); // Update the projects array after adding the default project
}

// Add sample todos only if no tasks exists
if (projects[0].todos.length === 0) {
  projects[0].todos.push(
    createTodo(
      "Refactor code",
      "Organize JavaScript into modules.",
      "2025-03-20",
      "medium",
      "Inbox"
    ),
    createTodo(
      "Style the app",
      "Apply greco-roman-inspired design.",
      "2025-03-25",
      "low"
    )
  );
  saveState(); // Save the updated state to localStorage
}

// Populate project picker and render initial projects
populateProjectPicker(projects);
renderProjects(projects);

// Initialize modal functionality
initModal(projects, () => {
  renderProjects(projects);
  saveState(); // Save Projects after updating
});
