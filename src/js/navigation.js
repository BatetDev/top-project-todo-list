// navigation.js
import { renderProjects } from "./dom-render.js";
import { renderArchiveView } from "./views/archive-view.js";
import { renderProjectsView } from "./views/projects-view.js";
import { getProjects } from "./core/state.js";
import {
  showAddProjectModal,
  renameProject,
  deleteProject,
} from "./components/project-ui.js";

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
