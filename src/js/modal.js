// Modal functionality logic

import { createTodo } from "./todos.js";
import { addTodoToProject } from "./projects.js";
import { renderProjects } from "./dom.js";
import {
  currentTask,
  taskDetails,
  editTaskForm,
  toggleEditMode,
} from "./dom.js";

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
console.log("Edit task form:", editTaskForm);
const editTaskBtn = expandedTaskModal.querySelector("#edit-task-btn");
const cancelEditBtn = expandedTaskModal.querySelector("#cancel-edit-btn");

// Function to populate the edit task form with task details
function populateEditTaskForm(task) {
  console.log("Populating edit form with task:", task);

  const nameField = editTaskForm.querySelector("#edit-task-name");
  const descriptionField = editTaskForm.querySelector("#edit-task-description");
  const dueDateField = editTaskForm.querySelector("#edit-task-due-date");
  const priorityField = editTaskForm.querySelector("#edit-task-priority");
  const projectField = editTaskForm.querySelector("#edit-task-project");

  console.log("Name field:", nameField);
  console.log("Description field:", descriptionField);
  console.log("Due date field:", dueDateField);
  console.log("Priority field:", priorityField);
  console.log("Project field:", projectField);

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
  projectField.value = task.project || "Inbox";
}

// Attach event listeners for toggling edit mode
editTaskBtn.addEventListener("click", () => {
  console.log("Current task in editTaskBtn:", currentTask); // Debugging log

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
});
