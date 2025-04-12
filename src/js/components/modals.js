// components/modals.js

import { getCurrentTask } from "../core/state.js";
import { format, parseISO } from "date-fns";

// Select modal elements
export const expandedTaskModal = document.getElementById("expanded-task-modal");
export const deleteConfirmationModal = document.getElementById(
  "delete-confirmation-modal"
);

let currentTask = null;

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  console.log("Opening expanded task modal for task:", task);
  currentTask = task;

  // Populate the modal with task details
  const taskDetails = expandedTaskModal.querySelector(".task-details");
  taskDetails.innerHTML = `
    <p><strong>Title:</strong> ${task.title}</p>
    <p><strong>Description:</strong> ${task.description || "No description"}</p>
    <p><strong>Due Date:</strong> ${
      task.dueDate
        ? format(parseISO(task.dueDate), "MMM d, yyyy")
        : "No due date"
    }</p>
    <p><strong>Priority:</strong> ${task.priority || "medium"}</p>
    <p><strong>Project:</strong> ${task.project || "Inbox"}</p>
  `;

  // Show the modal
  expandedTaskModal.classList.remove("hidden");
}

// Function to close the expanded task modal
export function closeExpandedTaskModal() {
  console.log("Closing expanded task modal.");
  expandedTaskModal.classList.add("hidden");
  currentTask = null; // Reset the current task
}

// Function to show the delete confirmation modal
export function showDeleteConfirmationModal(task) {
  console.log("Showing delete confirmation modal for task:", task);
  currentTask = task;

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
  console.log("Closing delete confirmation modal.");
  deleteConfirmationModal.classList.add("hidden");
  currentTask = null; // Reset the current task
}

// Add event listeners for modal interactions
document.addEventListener("DOMContentLoaded", () => {
  // Close expanded task modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (!expandedTaskModal.contains(e.target)) {
      closeExpandedTaskModal();
    }
  });

  // Close delete confirmation modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (!deleteConfirmationModal.contains(e.target)) {
      closeDeleteConfirmationModal();
    }
  });

  // Handle delete confirmation
  const confirmDeleteBtn = deleteConfirmationModal.querySelector(
    "#confirm-delete-btn"
  );
  confirmDeleteBtn.addEventListener("click", () => {
    console.log("User confirmed deletion. Proceeding to delete task...");

    if (!currentTask) {
      console.error("Error: currentTask is null or undefined.");
      closeDeleteConfirmationModal();
      return;
    }

    // Emit a custom event to notify other modules about the deletion
    const deleteEvent = new CustomEvent("taskDeleted", { detail: currentTask });
    document.dispatchEvent(deleteEvent);

    closeDeleteConfirmationModal();
    closeExpandedTaskModal(); // Close the expanded task modal as well
  });
});
