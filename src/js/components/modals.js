// components/modals.js

import { format, parseISO } from "date-fns";

// Select modal elements
export const expandedTaskModal = document.getElementById("expanded-task-modal");
export const deleteConfirmationModal = document.getElementById(
  "delete-confirmation-modal"
);

let currentTask = null;

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  currentTask = task;

  // Get references to elements
  const modalTitle = expandedTaskModal.querySelector("#task-title");
  const modalTaskDetails = expandedTaskModal.querySelector(".task-details");

  // Update title
  if (modalTitle) {
    modalTitle.textContent = task.title;
  }

  // Update task details
  if (modalTaskDetails) {
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
  }

  // Show the modal
  expandedTaskModal.classList.remove("hidden");
}

// Function to close the expanded task modal
export function closeExpandedTaskModal() {
  const modalTaskDetails = expandedTaskModal.querySelector(
    ".modal-content .task-details"
  );
  modalTaskDetails.classList.remove("expanded");
  expandedTaskModal.classList.add("hidden");
  currentTask = null;
}

// Function to show the delete confirmation modal
export function showDeleteConfirmationModal(task) {
  // Update the task name in the modal
  const taskNameElement = deleteConfirmationModal.querySelector(
    "#task-to-delete-name"
  );
  taskNameElement.textContent = `"${task.title}"`;

  // Show the modal
  deleteConfirmationModal.classList.remove("hidden");
}

// Function to close the delete confirmation modal
export function closeDeleteConfirmationModal() {
  deleteConfirmationModal.classList.add("hidden");
  currentTask = null;
}

// Add event listeners for modal interactions
document.addEventListener("DOMContentLoaded", () => {
  // Close expanded task modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (
      !expandedTaskModal.contains(e.target) &&
      !expandedTaskModal.classList.contains("hidden")
    ) {
      closeExpandedTaskModal();
    }
  });

  // Close delete confirmation modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (
      !deleteConfirmationModal.contains(e.target) &&
      !deleteConfirmationModal.classList.contains("hidden")
    ) {
      closeDeleteConfirmationModal();
    }
  });

  // Handle delete confirmation
  const confirmDeleteBtn = deleteConfirmationModal.querySelector(
    "#confirm-delete-btn"
  );
  confirmDeleteBtn.addEventListener("click", () => {
    if (!currentTask) {
      console.error("Error: currentTask is null or undefined.");
      closeDeleteConfirmationModal();
      return;
    }

    // Emit a custom event to notify other modules about the deletion
    const deleteEvent = new CustomEvent("taskDeleted", { detail: currentTask });
    document.dispatchEvent(deleteEvent);

    closeDeleteConfirmationModal();
    closeExpandedTaskModal();
  });
});
