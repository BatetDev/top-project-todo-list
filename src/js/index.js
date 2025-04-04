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
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content area

  // Create a container for the header and add project button
  const headerContainer = document.createElement("div");
  headerContainer.style.display = "flex";
  headerContainer.style.justifyContent = "space-between";
  headerContainer.style.alignItems = "center";
  headerContainer.style.marginBottom = "20px";

  // Create a header for the Projects screen
  const header = document.createElement("h2");
  header.textContent = "My Projects";
  header.style.color = "#b87333";
  header.style.margin = "0";
  headerContainer.appendChild(header);

  // Add a "+" button to add new projects
  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+";
  addProjectButton.style.backgroundColor = "#b87333";
  addProjectButton.style.color = "#fafafa";
  addProjectButton.style.border = "none";
  addProjectButton.style.borderRadius = "5px";
  addProjectButton.style.padding = "5px 10px";
  addProjectButton.style.fontSize = "1rem";
  addProjectButton.style.cursor = "pointer";
  addProjectButton.style.fontWeight = "bold";
  headerContainer.appendChild(addProjectButton);

  main.appendChild(headerContainer);

  // Create a container for the project list
  const projectList = document.createElement("ul");
  projectList.style.listStyleType = "none";
  projectList.style.padding = "0";

  // Get the list of projects from centralized state
  const projects = getProjects();

  // Add each project to the list
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.style.marginBottom = "10px";
    li.style.padding = "10px";
    li.style.backgroundColor = "#2b2b2b";
    li.style.borderRadius = "5px";
    li.style.color = "#fafafa";
    li.style.cursor = "pointer";
    projectList.appendChild(li);
  });

  main.appendChild(projectList);
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
