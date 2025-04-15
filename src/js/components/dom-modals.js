// dom-modals.js
import { format, parseISO } from "date-fns";

// Select modal elements
export const expandedTaskModal = document.getElementById("expanded-task-modal");
export const deleteConfirmationModal = document.getElementById(
  "delete-confirmation-modal"
);

let currentTask = null;
export { currentTask };
import { getProjects, saveState } from "../core/state.js";
import { populateProjectPicker, renderProjects } from "../dom-render.js";

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  if (!task) {
    console.error("No task provided to openExpandedTaskModal");
    return;
  }

  currentTask = task;

  // Get all required elements
  const modalTitle = expandedTaskModal?.querySelector("#task-title");
  const modalTaskDetails = expandedTaskModal?.querySelector(".task-details");

  if (!modalTitle || !modalTaskDetails) {
    console.error("Required modal elements not found");
    return;
  }

  try {
    modalTitle.textContent = task.title || "Untitled Task";
    modalTaskDetails.innerHTML = `
      <p><strong>Description:</strong> ${
        task.description || "No description"
      }</p>
      <p><strong>Due Date:</strong> ${
        task.dueDate
          ? format(parseISO(task.dueDate), "MMM d, yyyy")
          : "No due date"
      }</p>
      <p><strong>Priority:</strong> ${task.priority || "medium"}</p>
      <p><strong>Project:</strong> ${task.project || "Inbox"}</p>
    `;
    modalTaskDetails.classList.add("expanded");
    expandedTaskModal.classList.remove("hidden");
  } catch (error) {
    console.error("Error updating modal content:", error);
  }
}

// Function to close the expanded task modal
function closeExpandedTaskModal() {
  expandedTaskModal.classList.add("hidden");
}

// Close modal when clicking outside the modal content
expandedTaskModal.addEventListener("click", (e) => {
  const modalContent = expandedTaskModal.querySelector(".modal-content");
  if (!modalContent.contains(e.target)) {
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
const taskToDeleteName = deleteConfirmationModal.querySelector(
  "#task-to-delete-name"
);

// Function to show the delete confirmation modal
export function showDeleteConfirmationModal(task) {
  // Set the task name in the modal
  taskToDeleteName.textContent = `"${task.title}"` || "Unnamed Task";
  // Show the modal bt removing the "hidden" class
  deleteConfirmationModal.classList.remove("hidden");
}

// Select the cancel deletion button
const cancelDeleteBtn =
  deleteConfirmationModal.querySelector("#cancel-delete-btn");

// Close the delete confirmation modal
function closeDeleteConfirmationModal() {
  deleteConfirmationModal.classList.add("hidden");
  expandedTaskModal.classList.remove("hidden");
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
  // Show the delete confirmation confirmation modal with the current task details
  showDeleteConfirmationModal(currentTask);

  closeExpandedTaskModal();
});

// Select the confirm button
const confirmDeleteBtn = deleteConfirmationModal.querySelector(
  "#confirm-delete-btn"
);

// Add event listener for the Confirm button
confirmDeleteBtn.addEventListener("click", () => {
  // Check if currentTask is valid
  if (!currentTask) {
    console.error("Error: currentTask is null or undefined.");
    closeDeleteConfirmationModal();
    return;
  }

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

  saveState();

  renderProjects();

  closeDeleteConfirmationModal();

  closeExpandedTaskModal();
});

export { confirmDeleteBtn };
