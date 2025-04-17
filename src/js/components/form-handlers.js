// form-handlers.js
import { createTodo } from "../core/project-todo.js";
import { addTodoToProject } from "../core/project-todo.js";
import { toggleEditMode, currentTask } from "./dom-modals.js";
import { getProjects, saveState } from "../core/state.js";

import { format, parseISO } from "date-fns";

// Handle form submission for adding tasks
export function handleAddTaskFormSubmit(addTaskForm, renderProjectsCallback) {
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

      saveState();

      // Re-render the projects to update the UI
      renderProjectsCallback();
    }

    addTaskForm.reset();
  });
}

// Function to populate the edit task form with task details
export function populateEditTaskForm(task) {
  const projects = getProjects();
  const nameField = document.querySelector("#edit-task-name");
  const descriptionField = document.querySelector("#edit-task-description");
  const dueDateField = document.querySelector("#edit-task-due-date");
  const priorityField = document.querySelector("#edit-task-priority");
  const projectField = document.querySelector("#edit-task-project");

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

  // Close the expanded task modal when entering edit mode
  const expandedTaskModal = document.querySelector("#expanded-task-modal");
  if (expandedTaskModal) {
    expandedTaskModal.classList.add("hidden");
  }
}

// Handle form submissions for editing tasks
export function handleEditTaskFormSubmit(renderProjectsCallback) {
  const editTaskForm = document.querySelector("#edit-task-form");

  if (!editTaskForm) {
    console.error("Edit task form not found!");
    return;
  }

  // Remove any existing event listeners to prevent duplicates
  editTaskForm.removeEventListener("submit", handleSubmit);

  // Attach the event listener
  editTaskForm.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();

    // Capture edited values from the form fields
    const editedTaskName = document.querySelector("#edit-task-name")?.value;
    const editedTaskDescription = document.querySelector(
      "#edit-task-description"
    )?.value;
    const editedTaskDueDate = document.querySelector(
      "#edit-task-due-date"
    )?.value;
    const editedTaskPriority = document.querySelector(
      "#edit-task-priority"
    )?.value;
    const editedTaskProject =
      document.querySelector("#edit-task-project")?.value;

    // Get the centralized state (projects array)
    const projects = getProjects();

    // Find the project containing the current task
    const project = projects.find((p) =>
      p.todos.some((todo) => todo === currentTask)
    );

    if (!project) {
      console.error("Project containing the task not found");
      return;
    }

    // Locate the task in the project's todos array
    const taskIndex = project.todos.findIndex((todo) => todo === currentTask);

    if (taskIndex === -1) {
      console.error("Task not found in the project's todos array.");
      return;
    }

    // Update the task's properties with the new values
    project.todos[taskIndex].title = editedTaskName;
    project.todos[taskIndex].description = editedTaskDescription;
    project.todos[taskIndex].dueDate = editedTaskDueDate;
    project.todos[taskIndex].priority = editedTaskPriority;
    project.todos[taskIndex].project = editedTaskProject;

    // Update the currentTask reference
    currentTask.title = editedTaskName;
    currentTask.description = editedTaskDescription;
    currentTask.dueDate = editedTaskDueDate;
    currentTask.priority = editedTaskPriority;
    currentTask.project = editedTaskProject;

    saveState();
    renderProjectsCallback();

    // Update the expanded task modal with the new details while keeping it hidden
    const expandedTaskModal = document.querySelector("#expanded-task-modal");
    if (expandedTaskModal) {
      expandedTaskModal.classList.add("hidden"); // Keep it hidden
      const titleElement = expandedTaskModal.querySelector("#task-title");
      const descriptionElement =
        expandedTaskModal.querySelector("#task-description");
      const dueDateElement = expandedTaskModal.querySelector("#task-due-date");
      const priorityElement = expandedTaskModal.querySelector("#task-priority");
      const projectElement = expandedTaskModal.querySelector("#task-project");
      const priorityCircle = expandedTaskModal.querySelector(".task-circle");

      if (titleElement)
        titleElement.textContent = currentTask.title || "No title";
      if (descriptionElement)
        descriptionElement.textContent =
          currentTask.description || "No description";
      if (dueDateElement) {
        dueDateElement.textContent = currentTask.dueDate
          ? format(parseISO(currentTask.dueDate), "MMMM d, yyyy")
          : "No due date";
      }
      if (priorityElement)
        priorityElement.textContent = currentTask.priority || "No priority";
      if (projectElement)
        projectElement.textContent = currentTask.project || "No project";
      if (priorityCircle)
        priorityCircle.setAttribute("data-priority", currentTask.priority);
    }

    // Switch back to view mode
    toggleEditMode(false);
  }
}
