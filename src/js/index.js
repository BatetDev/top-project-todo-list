/* index.js */
import "../styles/main.css";
import { initializeState, getProjects, saveState } from "./state.js";
import { createProject, addTodoToProject, createTodo } from "./project-todo.js";
import { renderProjects, populateProjectPicker } from "./dom-render.js";
import { initModal } from "./modal-logic.js";

// Initialize app state
initializeState();

// Get the centralized projects array
let projects = getProjects();

// Add default project ("Inbox") only if no projects exist
if (projects.length === 0) {
  const inboxProject = createProject("Inbox");
  addTodoToProject(inboxProject);
  saveState();
}

// Populate project picker and render initial projects
populateProjectPicker(projects);
renderProjects(projects);

// Initialize modal functionality
initModal(() => {
  renderProjects(projects);
  saveState();
});

// Handle form submissions
handleAddTaskFormSubmit(document.querySelector("#add-task-form"), () => {
  renderProjects(projects);
  saveState();
});
