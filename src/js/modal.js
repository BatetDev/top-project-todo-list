// Modal functionality logic

import { createTodo } from "./todos.js";
import { addTodoToProject } from "./projects.js";
import { renderProjects } from "./dom.js";

// Initialize modal functionality
export function initModal(projects, renderProjects) {
  const addTaskButton = document.querySelector("#add-task-btn");
  const modal = document.querySelector("#add-task-modal");
  const modalContent = document.querySelector(".modal-content");
  const closeModalButton = document.querySelector(".close-modal");
  const addTaskForm = document.querySelector("#add-task-form");

  // Show modal and hide "+" button
  addTaskButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    addTaskButton.style.display = "none";
  });

  // Hide modal and show the "+" button
  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    addTaskButton.style.display = "block";
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

  // Handle form submission
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture form field values
    const taskName = document.querySelector("#task-name").value;
    const taskDescription = document.querySelector("#task-description").value;
    const taskDueDate = document.querySelector("#task-due-date").value;
    const taskPriority = document.querySelector("#task-priority").value;
    const taskProject = document.querySelector("#task-project").value;

    // Create a new todo object using the factory function
    const newTodo = createTodo(
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority
    );

    // Find the selected project (defaulting to "Inbox")
    const selectedProject = projects.find(
      (project) => project.name === taskProject
    );

    if (selectedProject) {
      // Add the new todo to the selected project's todos array
      addTodoToProject(selectedProject, newTodo);

      // Re-render the projects to update the UI
      renderProjects(projects);
    }

    // Reset form fields
    addTaskForm.reset();
  });
}
