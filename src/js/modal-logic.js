// modal-logic.js
import { createTodo } from "./project-todo.js";
import { addTodoToProject } from "./project-todo.js";
import { populateProjectPicker, renderProjects } from "./dom-render.js";
import { getProjects, saveState } from "./state.js";

// Initialize modal functionality
export function initModal(renderProjectsCallback) {
  const addTaskButton = document.querySelector("#add-task-btn");
  const modal = document.querySelector("#add-task-modal");
  const modalContent = document.querySelector(".modal-content");
  const addTaskForm = document.querySelector("#add-task-form");

  // Get the project picker dropdown
  const projectPicker = document.querySelector("#task-project");

  // Show modal and hide "+" button
  addTaskButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    addTaskButton.style.display = "none";

    // Populate the project picker dynamically
    const projects = getProjects(); // Use centralized state
    populateProjectPicker(projects, projectPicker);
  });

  // Close modal when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !modalContent.contains(event.target) &&
      !addTaskButton.contains(event.target)
    ) {
      modal.classList.add("hidden");
      addTaskButton.style.display = "block";
    }
  });
}
