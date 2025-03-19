// Modal functionality logic

import { createTodo } from "./todos.js";
import { addTodoToProject } from "./projects.js";
import { renderProjects } from "./dom.js";
import { openExpandedTaskModal } from "./dom.js"; // Import the consolidated function
import { currentTask } from "./state.js"; // Import shared state

// Initialize modal functionality
export function initModal(projects, renderProjects) {
  const addTaskButton = document.querySelector("#add-task-btn");
  const modal = document.querySelector("#add-task-modal");
  const modalContent = document.querySelector(".modal-content");
  const addTaskForm = document.querySelector("#add-task-form");

  // Show modal and hide "+" button
  addTaskButton.addEventListener("click", () => {
    modal.classList.add("visible");
    addTaskButton.style.display = "none";
  });

  // Close modal when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !modalContent.contains(event.target) &&
      !addTaskButton.contains(event.target)
    ) {
      modal.classList.remove("visible");
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

// Select the expanded task modal and its elements
const expandedTaskModal = document.querySelector("#expanded-task-modal");
const taskDetails = expandedTaskModal.querySelector(".task-details");
const editTaskForm = expandedTaskModal.querySelector("#edit-task-form");
const editTaskBtn = expandedTaskModal.querySelector("#edit-task-btn");
const cancelEditBtn = expandedTaskModal.querySelector("#cancel-edit-btn");

// Function to populate the edit task form with task details
function populateEditTaskForm(task) {
  console.log("Populating edit form with task:", task); // Debugging log

  editTaskForm.querySelector("#edit-task-name").value = task.title || "";
  editTaskForm.querySelector("#edit-task-description").value =
    task.description || "";
  editTaskForm.querySelector("#edit-task-due-date").value = task.dueDate || "";
  editTaskForm.querySelector("#edit-task-priority").value =
    task.priority || "medium";
  editTaskForm.querySelector("#edit-task-project").value =
    task.project || "Inbox";
}

// Function to toggle between view and edit modes
function toggleEditMode(isEditing) {
  if (isEditing) {
    taskDetails.classList.add("hidden"); // Hide task details
    editTaskForm.classList.remove("hidden"); // Show edit form
    editTaskForm.classList.add("visible");
  } else {
    taskDetails.classList.remove("hidden"); // Show task details
    editTaskForm.classList.remove("visible"); // Hide edit form
    editTaskForm.classList.add("hidden");
  }
}

// Attach event listeners for toggling edit mode
editTaskBtn.addEventListener("click", () => {
  console.log("Current task in editTaskBtn:", currentTask); // Debugging log
  populateEditTaskForm(currentTask); // Pre-fill the form with the current task's details
  toggleEditMode(true); // Switch to edit mode
});

cancelEditBtn.addEventListener("click", () => {
  toggleEditMode(false); // Switch back to view mode
});
