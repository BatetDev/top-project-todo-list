/* index.js */
import "../styles/main.css";
import { initializeState, getProjects, saveState } from "./state.js";
import { createProject, addTodoToProject } from "./project-todo.js";
import { renderProjects, populateProjectPicker } from "./dom-render.js";
import { displayAddTaskModal } from "./modal-logic.js";
import {
  handleAddTaskFormSubmit,
  handleEditTaskFormSubmit,
} from "./form-handlers.js";

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

renderProjects(projects);

// Display add task modal and initializes it's functionality
displayAddTaskModal(() => {
  renderProjects(projects);
  saveState();
});

// Handle add task form submissions
handleAddTaskFormSubmit(document.querySelector("#add-task-form"), () => {
  renderProjects(projects);
  saveState();
});

// Handle form submissions for editing tasks
handleEditTaskFormSubmit(() => {
  renderProjects(projects);
  saveState();
});
