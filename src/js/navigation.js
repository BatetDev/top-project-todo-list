// navigation.js
import { renderProjects } from "./dom-render.js";
import { renderHomeView } from "./views/home-view.js";
import { renderProjectsView } from "./views/projects-view.js";
import { renderArchiveView } from "./views/archive-view.js";
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

console.log("Home tab element:", homeTab);
console.log("Archive tab element:", archiveTab);
console.log("Projects tab element:", projectsTab);

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  activeTab.classList.add("active");
}

// Add event listeners to navigation buttons
homeTab.addEventListener("click", (e) => {
  console.log("Home tab clicked", e.target);
  setActiveTab(homeTab);
  renderHomeView();
});

archiveTab.addEventListener("click", (e) => {
  console.log("Archive tab clicked", e.target);
  setActiveTab(archiveTab);
  renderArchiveView();
});

projectsTab.addEventListener("click", (e) => {
  console.log("Projects tab clicked", e.target);
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Initialize the default view
setActiveTab(homeTab);
renderHomeView();
