// navigation.js
import { renderProjects } from "./dom-render.js";
import { getProjects } from "./state.js";

// Select the main content area and navigation buttons
const main = document.querySelector("main");
const todayTab = document.querySelector("#today-tab");
const searchTab = document.querySelector("#search-tab");
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
  // Add click event listener to open the Add Project Modal
  addProjectButton.addEventListener("click", () => {
    console.log("Add Project button clicked. Opening modal...");
    showAddProjectModal();
  });
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
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";
    li.style.padding = "10px";
    li.style.backgroundColor = "#2b2b2b";
    li.style.borderRadius = "5px";
    li.style.color = "#fafafa";
    li.style.cursor = "pointer";
    // Project name
    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    li.appendChild(projectName);
    // Actions container (edit and delete icons)
    if (project.name !== "Inbox") {
      const actionsContainer = document.createElement("div");
      actionsContainer.style.display = "flex";
      actionsContainer.style.gap = "10px";
      // Edit icon
      const editIcon = document.createElement("span");
      editIcon.textContent = "✏️";
      editIcon.style.cursor = "pointer";
      editIcon.title = "Rename Project";
      editIcon.addEventListener("click", () => {
        console.log(`Edit icon clicked for project: ${project.name}`);
        renameProject(project);
      });
      actionsContainer.appendChild(editIcon);
      // Delete icon
      const deleteIcon = document.createElement("span");
      deleteIcon.textContent = "🗑️";
      deleteIcon.style.cursor = "pointer";
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

searchTab.addEventListener("click", () => {
  setActiveTab(searchTab);
  renderSearchView();
});

projectsTab.addEventListener("click", () => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Initialize the default view
renderTodayView();
