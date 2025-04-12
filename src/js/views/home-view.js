// views/home-view.js

import { getProjects } from "../core/state.js";
import { renderProjects } from "../dom-render.js";

// Function to render the Home view
export function renderHomeView() {
  console.log("Rendering Home view...");
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content area

  const projects = getProjects();
  renderProjects(projects); // Render the projects
}
