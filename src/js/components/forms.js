// components/forms.js

import { getProjects, saveState } from "../core/state.js";
import { createTodo } from "../core/project-todo.js";
import { openExpandedTaskModal } from "./modals.js";

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

    // Create the new todo object
    const newTodo = createTodo(
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskProject
    );

    // Find the selected project (defaulting to "Inbox")
    const projects = getProjects();
    const selectedProject = projects.find(
      (project) => project.name === taskProject
    );

    if (selectedProject) {
      // Add the new todo to the selected project's todos array
      selectedProject.todos.push(newTodo);
      saveState(); // Persist the updated state
    }

    // Re-render the UI
    renderProjectsCallback();

    // Reset the form
    addTaskForm.reset();
  });
}

// Handle form submission for editing tasks
export function handleEditTaskFormSubmit(renderProjectsCallback) {
  const editTaskForm = document.querySelector("#edit-task-form");
  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture edited form field values
    const editedTaskTitle = document.querySelector("#edit-task-title").value;
    const editedTaskDescription = document.querySelector(
      "#edit-task-description"
    ).value;
    const editedTaskDueDate = document.querySelector(
      "#edit-task-due-date"
    ).value;
    const editedTaskPriority = document.querySelector(
      "#edit-task-priority"
    ).value;
    const editedTaskProject =
      document.querySelector("#edit-task-project").value;

    // Update the current task with the new values
    const currentTask = getCurrentTask();
    if (!currentTask) return;

    const projects = getProjects();
    const project = projects.find((p) => p.todos.includes(currentTask));
    if (!project) {
      console.error("Project containing the task not found.");
      return;
    }

    const taskIndex = project.todos.indexOf(currentTask);
    project.todos[taskIndex].title = editedTaskTitle;
    project.todos[taskIndex].description = editedTaskDescription;
    project.todos[taskIndex].dueDate = editedTaskDueDate;
    project.todos[taskIndex].priority = editedTaskPriority;
    project.todos[taskIndex].project = editedTaskProject;

    // Update the currentTask reference
    currentTask.title = editedTaskTitle;
    currentTask.description = editedTaskDescription;
    currentTask.dueDate = editedTaskDueDate;
    currentTask.priority = editedTaskPriority;
    currentTask.project = editedTaskProject;

    // Save the updated state
    saveState();

    // Re-render the UI
    renderProjectsCallback();

    // Update the expanded task modal with the new details
    openExpandedTaskModal(currentTask);
  });
}

// Populate the project picker dynamically
export function setupProjectPicker(
  projects,
  selectElement,
  selectedProject = "Inbox"
) {
  // Clear existing options
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }

  try {
    // Add an option element for each project
    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.name;
      option.textContent = project.name;
      if (project.name === selectedProject) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating project picker:", error);
    console.log("SelectElement:", selectElement);
    console.log("Projects:", projects);
  }
}
