// navigation.js
import { renderProjects } from "./dom-render.js";
import { getProjects } from "./state.js";
import {
  showAddProjectModal,
  renameProject,
  deleteProject,
} from "./project-ui.js";

// Select the main content area and navigation buttons
const main = document.querySelector("main");
const todayTab = document.querySelector("#today-tab");
const archiveTab = document.querySelector("#archive-tab");
const projectsTab = document.querySelector("#projects-tab");

// Function to render the default view (Today)
export function renderTodayView() {
  console.log("Rendering Today view...");
  const projects = getProjects();
  renderProjects(projects);
}

// Function to render the Projects view
export function renderProjectsView() {
  console.log("Rendering Projects view...");
  main.innerHTML = "";

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("projects-header-container");

  const header = document.createElement("h2");
  header.textContent = "My Projects";
  header.classList.add("projects-title");
  headerContainer.appendChild(header);

  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+";
  addProjectButton.classList.add("add-project-button");
  addProjectButton.addEventListener("click", () => {
    console.log("Add Project button clicked. Opening modal...");
    showAddProjectModal();
  });
  headerContainer.appendChild(addProjectButton);
  main.appendChild(headerContainer);

  const projectList = document.createElement("ul");
  projectList.classList.add("project-list");

  const projects = getProjects();
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.classList.add("project-item");

    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    li.appendChild(projectName);

    if (project.name !== "Inbox") {
      const actionsContainer = document.createElement("div");
      actionsContainer.classList.add("project-actions");

      const editIcon = document.createElement("span");
      editIcon.textContent = "✏️";
      editIcon.classList.add("project-action-icon");
      editIcon.title = "Rename Project";
      editIcon.addEventListener("click", () => {
        console.log(`Edit icon clicked for project: ${project.name}`);
        renameProject(project);
      });
      actionsContainer.appendChild(editIcon);

      const deleteIcon = document.createElement("span");
      deleteIcon.textContent = "🗑️";
      deleteIcon.classList.add("project-action-icon");
      deleteIcon.title = "Delete Project";
      deleteIcon.addEventListener("click", () => {
        console.log(`Delete icon clicked for project: ${project.name}`);
        deleteProject(project);
      });
      actionsContainer.appendChild(deleteIcon);
      li.appendChild(actionsContainer);
    }
    projectList.appendChild(li);
  });
  main.appendChild(projectList);
}

// Function to render the Search view (placeholder)
export function renderSearchView() {
  console.log("Rendering Search view...");
  main.innerHTML = "<p>Search functionality coming soon...</p>";
}

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  activeTab.classList.add("active");
}

// Add event listeners to navigation buttons
todayTab.addEventListener("click", () => {
  setActiveTab(todayTab);
  renderTodayView();
});

archiveTab.addEventListener("click", () => {
  setActiveTab(archiveTab);
  renderSearchView();
});

projectsTab.addEventListener("click", () => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Initialize the default view
renderTodayView();
