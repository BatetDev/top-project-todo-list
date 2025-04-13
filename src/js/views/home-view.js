// views/home-view.js

import { getProjects } from "../core/state.js";
import { renderProjects } from "../dom-render.js";

// Function to render the Home view
export function renderHomeView() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const projects = getProjects();
  renderProjects(projects);
}
