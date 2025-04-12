// navigation.js
import { renderHomeView } from "./views/home-view.js";
import { renderProjectsView } from "./views/projects-view.js";
import { renderArchiveView } from "./views/archive-view.js";

// Select the main content area and navigation buttons
const homeTab = document.querySelector("#home-tab");
const archiveTab = document.querySelector("#archive-tab");
const projectsTab = document.querySelector("#projects-tab");

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  activeTab.classList.add("active");
}

// Add event listeners for navigation buttons
homeTab.addEventListener("click", (e) => {
  setActiveTab(homeTab);
  renderHomeView();
});

archiveTab.addEventListener("click", (e) => {
  setActiveTab(archiveTab);
  renderArchiveView();
});

projectsTab.addEventListener("click", (e) => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Initialize the default view
setActiveTab(homeTab);
renderHomeView();
