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

// Select the main content area and navigation buttons
const main = document.querySelector("main");
const todayTab = document.querySelector("#today-tab");
const searchTab = document.querySelector("#search-tab");
const projectsTab = document.querySelector("#projects-tab");

// Function to render the default view (Today)
function renderTodayView() {
  console.log("Rendering Today view...");
  const projects = getProjects();
  renderProjects(projects);
}

// Function to render the Projects view
function renderProjectsView() {
  console.log("Rendering Projects view...");
  // For now, reuse the renderProjects function
  // Later, create a dedicated function for rendering the Projects screen
  const projects = getProjects();
  renderProjects(projects);
}

// Function to render the Search view (placeholder)
function renderSearchView() {
  console.log("Rendering Search view...");
  main.innerHTML = "<p>Search functionality coming soon...</p>";
}

// Add event listeners to navigation buttons
todayTab.addEventListener("click", () => {
  setActiveTab(todayTab);
  renderTodayView();
});

searchTab.addEventListener("click", () => {
  setActiveTab(searchTab);
  renderSearchView();
});

projectsTab.addEventListener("click", () => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  activeTab.classList.add("active");
}

// Initialize the default view
renderTodayView();
