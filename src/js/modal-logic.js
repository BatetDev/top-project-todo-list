// modal-logic.js
import { populateProjectPicker } from "./dom-render.js";
import { getProjects, saveState } from "./state.js";

// Initialize modal functionality
export function displayAddTaskModal(renderProjectsCallback) {
  const addTaskButton = document.querySelector("#add-task-btn");
  const modal = document.querySelector("#add-task-modal");
  const modalContent = document.querySelector(".modal-content");
  const addTaskForm = document.querySelector("#add-task-form");

  // Get the project picker dropdown
  const projectPicker = document.querySelector("#task-project");

  // Show modal and hide "+" button
  addTaskButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    addTaskButton.classList.add("hidden");

    // Populate the project picker dynamically
    const projects = getProjects();

    if (projectPicker) {
      populateProjectPicker(projects, projectPicker);
    } else {
      console.error("Project picker element (#task-project) not found.");
    }
  });

  // Close modal when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !modalContent.contains(event.target) &&
      !addTaskButton.contains(event.target)
    ) {
      modal.classList.add("hidden");
      addTaskButton.classList.remove("hidden");
    }
  });
}
