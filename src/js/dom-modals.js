// dom-modals.js
let currentTask = null;
export { currentTask };
import { getProjects, saveState } from "./state.js";
import { populateProjectPicker, renderProjects } from "./dom-render.js";

const expandedTaskModal = document.querySelector("#expanded-task-modal");

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  console.log("Task passed to openExpandedTaskModal:", task);
  currentTask = task;

  // Populate the modal with task details
  expandedTaskModal.querySelector("#task-title").textContent =
    task.title || "No title";
  expandedTaskModal.querySelector("#task-description").textContent =
    task.description || "No description";
  expandedTaskModal.querySelector("#task-due-date").textContent =
    task.dueDate || "No due date";
  expandedTaskModal.querySelector("#task-priority").textContent =
    task.priority || "No priority";
  expandedTaskModal.querySelector("#task-project").textContent =
    task.project || "No project";

  // Show the modal by removing the "hidden" class
  expandedTaskModal.classList.remove("hidden");
}

// Function to close the expanded task modal
function closeExpandedTaskModal() {
  expandedTaskModal.classList.add("hidden");
}

// Close modal when clicking outside the modal content
expandedTaskModal.addEventListener("click", (e) => {
  const modalContent = expandedTaskModal.querySelector(".modal-content");
  console.log("Clicked inside #expanded-task-modal");
  if (!modalContent.contains(e.target)) {
    console.log("Clicked outside .modal-content, closing modal...");
    closeExpandedTaskModal();
    // Reset edit mode to ensure the expanded task modal is shown
    toggleEditMode(false);
  }
});

// Select modal elements
export const taskDetails = expandedTaskModal.querySelector(".task-details");
export const editTaskForm = expandedTaskModal.querySelector("#edit-task-form");
const editTaskBtn = expandedTaskModal.querySelector("#edit-task-btn");
const deleteTaskBtn = expandedTaskModal.querySelector("#delete-task-btn");

// Add edit button event listener
editTaskBtn.addEventListener("click", () => {
  console.log("Edit button clicked");
  toggleEditMode(true);
});

// Function to toggle between view and edit modes
export function toggleEditMode(isEditing) {
  console.log(
    "Toggling edit mode:",
    isEditing ? "Switching to edit mode" : "Switching to view mode"
  );
  if (isEditing) {
    taskDetails.classList.add("hidden"); // Hide task details
    editTaskForm.classList.remove("hidden"); // Show edit form
    populateEditForm(currentTask);
  } else {
    taskDetails.classList.remove("hidden"); // Show task details
    editTaskForm.classList.add("hidden"); // Hide edit form
  }
}

// Function to populate the edit form
function populateEditForm(task) {
  if (!task) return;

  // Get all projects
  const projects = getProjects();
  const projectSelect = editTaskForm.querySelector("#edit-task-project");

  if (!projectSelect) {
    console.error("Project select element not found in edit form");
    return;
  }

  // Populate project picker dropdown first
  populateProjectPicker(projects, projectSelect, task.project);

  // Populate other form fields
  const nameInput = editTaskForm.querySelector("#edit-task-name");
  const descInput = editTaskForm.querySelector("#edit-task-description");
  const dateInput = editTaskForm.querySelector("#edit-task-due-date");
  const priorityInput = editTaskForm.querySelector("#edit-task-priority");

  if (nameInput) nameInput.value = task.title || "";
  if (descInput) descInput.value = task.description || "";
  if (dateInput) dateInput.value = task.dueDate || "";
  if (priorityInput) priorityInput.value = task.priority || "medium";
}

// Select the delete confimation modal and its elements
const deleteConfirmationModal = document.querySelector(
  "#delete-confirmation-modal"
);
const taskToDeleteName = deleteConfirmationModal.querySelector(
  "#task-to-delete-name"
);

// Function to show the delete confirmation modal
export function showDeleteConfirmationModal(task) {
  console.log("Showing delete confirmation modal for task:", task);
  // Set the task name in the modal
  taskToDeleteName.textContent = task.title || "Unnamed Task";
  // Show the modal bt removing the "hidden" class
  deleteConfirmationModal.classList.remove("hidden");
}

// Select the cancel deletion button
const cancelDeleteBtn =
  deleteConfirmationModal.querySelector("#cancel-delete-btn");

// CLose the delete confirmation modal
function closeDeleteConfirmationModal() {
  console.log("Closing delete confirmation moda...");
  deleteConfirmationModal.classList.add("hidden");
}

// Close modal when clicking outside the modal content
deleteConfirmationModal.addEventListener("click", (e) => {
  const modalContent = deleteConfirmationModal.querySelector(".modal-content");
  if (!modalContent.contains(e.target)) {
    closeDeleteConfirmationModal();
  }
});

// Add event listener and functionality for the Cancel button
cancelDeleteBtn.addEventListener("click", () => {
  closeDeleteConfirmationModal();
});

// Add event listener for the delete button
deleteTaskBtn.addEventListener("click", () => {
  console.log("Delete button clicked. Initiating task deletion...");
  // Show the delete confirmation modal with the current task details
  showDeleteConfirmationModal(currentTask);

  // Get the centralized state (projects array)
  const projects = getProjects();

  // Find the project containing the current task
  const project = projects.find((p) =>
    p.todos.some((todo) => todo === currentTask)
  );

  if (!project) {
    console.error("Project containing the task no found.");
    return;
  }

  // Remove the task from the project's todos array
  project.todos = project.todos.filter((todo) => todo !== currentTask);

  console.log("Task deleted from project:", project);

  // Save the updated state to localStorage
  saveState();

  // Re-render the UI to reflect the changes
  renderProjects();

  closeExpandedTaskModal();
});
