// dom-modals.js
let currentTask = null; // Variable to store the currently selected task
export { currentTask }; // Export currentTask for use in other modules

// Select the expanded task modal and its elements
const expandedTaskModal = document.querySelector("#expanded-task-modal");

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  console.log("Task passed to openExpandedTaskModal:", task);

  // Store the current task
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
  // Hide the modal by adding the "hidden" class
  console.log("closeExpandedTaskModal is closing modal...");
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

// Function to toggle between view and edit modes
export function toggleEditMode(isEditing) {
  console.log(
    "Toggling edit mode:",
    isEditing ? "Switching to edit mode" : "Switching to view mode"
  );
  if (isEditing) {
    taskDetails.classList.add("hidden"); // Hide task details
    editTaskForm.classList.remove("hidden"); // Show edit form
  } else {
    taskDetails.classList.remove("hidden"); // Show task details
    editTaskForm.classList.add("hidden"); // Hide edit form
  }
}
