// index.js
import "../styles/main.css";
import { initializeState, getProjects, saveState } from "./state.js";
import { createProject, addTodoToProject, createTodo } from "./project-todo.js";
import { renderProjects, populateProjectPicker } from "./dom-render.js";
import { displayAddTaskModal } from "./modal-logic.js";
import {
  handleAddTaskFormSubmit,
  handleEditTaskFormSubmit,
} from "./form-handlers.js";
import {
  renderHomeView,
  renderArchiveView,
  renderProjectsView,
} from "./navigation.js";
import {
  showAddProjectModal,
  closeAddProjectModal,
  handleAddProjectFormSubmit as handleProjectFormSubmit,
  renameProject,
  deleteProject,
} from "./project-ui.js";

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
    console.log("Cancel button clicked. Closing Add Project modal...");
    closeAddProjectModal();
  });

// Add event listener to close the modal when clicking outside
document.querySelector("#add-project-modal").addEventListener("click", (e) => {
  if (e.target.id === "add-project-modal") {
    console.log("Clicked outside modal content. Closing Add Project modal...");
    closeAddProjectModal();
  }
});

// Attach the event listener for the Add Project form submission
handleProjectFormSubmit();
