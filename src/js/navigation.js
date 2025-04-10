// navigation.js
import { renderArchiveView, renderProjects } from "./dom-render.js";
import { getProjects } from "./state.js";
import {
  showAddProjectModal,
  renameProject,
  deleteProject,
} from "./project-ui.js";

// Select the main content area and navigation buttons
const main = document.querySelector("main");
const homeTab = document.querySelector("#home-tab");
const archiveTab = document.querySelector("#archive-tab");
const projectsTab = document.querySelector("#projects-tab");

// Function to render the default view (Today)
export function renderHomeView() {
  console.log("Rendering Home view...");
  const projects = getProjects();
  renderProjects(projects);
}

// Render the Projects view
export function renderProjectsView() {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content area

  const projects = getProjects();

  // Exclude the "Inbox" project
  const filteredProjects = projects.filter(
    (project) => project.name !== "Inbox"
  );

  if (filteredProjects.length === 0) {
    // Fallback message if there are no custom projects
    const noProjectsMessage = document.createElement("p");
    noProjectsMessage.textContent = "No custom projects to display.";
    noProjectsMessage.style.color = "#888"; // Subtle gray color
    main.appendChild(noProjectsMessage);
  } else {
    // Render each custom project
    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    filteredProjects.forEach((project) => {
      const li = document.createElement("li");
      li.classList.add("project-item");

      // Project name
      const projectName = document.createElement("span");
      projectName.textContent = project.name;
      li.appendChild(projectName);

      // Actions container (edit and delete icons)
      const actionsContainer = document.createElement("div");
      actionsContainer.classList.add("project-actions");

      // Edit icon
      const editIcon = document.createElement("span");
      editIcon.textContent = "✏️";
      editIcon.classList.add("project-action-icon");
      editIcon.title = "Rename Project";
      editIcon.addEventListener("click", () => {
        console.log(`Edit icon clicked for project: ${project.name}`);
        renameProject(project);
      });
      actionsContainer.appendChild(editIcon);

      // Delete icon
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
      projectList.appendChild(li);
    });

    main.appendChild(projectList);
  }
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
homeTab.addEventListener("click", () => {
  setActiveTab(homeTab);
  renderHomeView();
});

archiveTab.addEventListener("click", () => {
  setActiveTab(archiveTab);
  renderArchiveView();
});

projectsTab.addEventListener("click", () => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Initialize the default view
renderHomeView();
