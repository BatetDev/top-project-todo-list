// modal.js
// Modal functionality logic
import { createTodo } from "./todos.js";
import { addTodoToProject } from "./projects.js";
import {
  populateProjectPicker,
  renderProjects,
  openExpandedTaskModal,
} from "./dom.js";
import {
  taskDetails,
  editTaskForm,
  toggleEditMode,
  currentTask,
} from "./dom.js";
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
      taskPriority,
      taskProject
    );

    // Find the selected project (defaulting to "Inbox")
    const projects = getProjects(); // Use centralized state
    const selectedProject = projects.find(
      (project) => project.name === taskProject
    );

    if (selectedProject) {
      // Add the new todo to the selected project's todos array
      addTodoToProject(selectedProject, newTodo);

      // Save the updated state to localStorage
      saveState();

      // Re-render the projects to update the UI
      renderProjectsCallback();
    }

    // Reset form fields
    addTaskForm.reset();
  });
}

// Select the expanded task modal and its elements
const expandedTaskModal = document.querySelector("#expanded-task-modal");
const editTaskBtn = expandedTaskModal.querySelector("#edit-task-btn");
const cancelEditBtn = expandedTaskModal.querySelector("#cancel-edit-btn");

// Function to populate the edit task form with task details
function populateEditTaskForm(task) {
  console.log("Populating edit form with task:", task);

  const projects = getProjects(); // Use centralized state
  const nameField = editTaskForm.querySelector("#edit-task-name");
  const descriptionField = editTaskForm.querySelector("#edit-task-description");
  const dueDateField = editTaskForm.querySelector("#edit-task-due-date");
  const priorityField = editTaskForm.querySelector("#edit-task-priority");
  const projectField = editTaskForm.querySelector("#edit-task-project");

  if (
    !nameField ||
    !descriptionField ||
    !dueDateField ||
    !priorityField ||
    !projectField
  ) {
    console.error("One or more form fields are missing in the DOM.");
    return;
  }

  nameField.value = task.title || "";
  descriptionField.value = task.description || "";
  dueDateField.value = task.dueDate || "";
  priorityField.value = task.priority || "medium";

  // Populate the project picker dynamically
  populateProjectPicker(projects, projectField, task.project || "Inbox");
}

// Attach event listeners for toggling edit mode
editTaskBtn.addEventListener("click", () => {
  toggleEditMode(true); // Switch to edit mode

  // Delay population of the form to ensure the DOM is updated
  setTimeout(() => {
    populateEditTaskForm(currentTask);
  }, 0);
});

cancelEditBtn.addEventListener("click", () => {
  toggleEditMode(false); // Switch back to view mode
});

// Attach event listener for saving changes
editTaskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload
  console.log("Save Changes button clicked. Form submission prevented.");

  // TODO: Implement logic to update the task in the centralized state
});
