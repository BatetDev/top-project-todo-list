// index.js
import "../styles/main.css";
import { initializeState, getProjects, saveState } from "./core/state.js";
import {
  createProject,
  addTodoToProject,
  createTodo,
} from "./core/project-todo.js";
import { renderProjects, populateProjectPicker } from "./dom-render.js";
import { displayAddTaskModal } from "./components/modal-logic.js";
import {
  handleAddTaskFormSubmit,
  handleEditTaskFormSubmit,
} from "./components/form-handlers.js";
import { renderHomeView } from "./views/home-view.js";
import {
  closeAddProjectModal,
  handleAddProjectFormSubmit,
} from "./components/project-ui.js";
import "./navigation.js";

// Initialize app state
initializeState();

// Get the centralized projects array
const projects = getProjects();

// Add default project ("Inbox") only if no projects exist
if (projects.length === 0) {
  const inboxProject = createProject("Inbox");
  addTodoToProject(
    inboxProject,
    createTodo("Sample Task", "Description", "2025-03-20", "medium")
  );
  saveState();
}

// Populate project picker and render initial projects
const projectPicker = document.querySelector("#task-project");
if (projectPicker) {
  populateProjectPicker(projects, projectPicker);
} else {
  console.error("Project picker element (#task-project) not found.");
}
renderProjects();

// Initialize modal functionality
displayAddTaskModal(() => {
  renderProjects(projects);
  saveState();
});

// Handle form submissions for ADDING tasks
handleAddTaskFormSubmit(document.querySelector("#add-task-form"), () => {
  renderProjects(projects);
  saveState();
});

// Handle form submissions for EDITING tasks
handleEditTaskFormSubmit(() => {
  renderProjects(projects);
  saveState();
});

// Initialize navigation
renderHomeView();

// Add event listener to the Cancel button in the Add Project Modal
document
  .querySelector("#cancel-add-project-btn")
  .addEventListener("click", () => {
    closeAddProjectModal();
  });

// Add event listener to close the modal when clicking outside
document.querySelector("#add-project-modal").addEventListener("click", (e) => {
  if (e.target.id === "add-project-modal") {
    closeAddProjectModal();
  }
});

// Attach the event listener for the Add Project form submission
handleAddProjectFormSubmit();
