// form-handlers.js
import { createTodo } from "./project-todo.js";
import { addTodoToProject } from "./project-todo.js";
import { toggleEditMode, currentTask } from "./dom-modals.js";
import { getProjects, saveState } from "./state.js";

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

      // Save the updated state to localStorage
      saveState();

      // Re-render the projects to update the UI
      renderProjectsCallback();
    }

    // Reset form fields
    addTaskForm.reset();
  });
}

// Function to populate the edit task form with task details
export function populateEditTaskForm(task) {
  console.log("Populating edit form with task:", task);
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
}

// Handle form submissions for editing tasks
export function handleEditTaskFormSubmit(renderProjectsCallback) {
  const editTaskForm = document.querySelector("#edit-task-form");

  if (!editTaskForm) {
    console.error("Edit task form not found!");
    return;
  }

  console.log("Edit task form found:", editTaskForm);

  // Remove any existing event listeners to prevent duplicates
  editTaskForm.removeEventListener("submit", handleSubmit);

  // Attach the event listener
  editTaskForm.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    console.log("Submit event triggered."); // Debugging log

    // Prevent the default form submission behavior
    event.preventDefault();
    console.log("Form submission prevented."); // Debugging log

    // Capture edited values from the form fields
    const editedTaskName = document.querySelector("#edit-task-name").value;
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

    // Log the captured values for debugging
    console.log("Edited Task Values:", {
      editedTaskName,
      editedTaskDescription,
      editedTaskDueDate,
      editedTaskPriority,
      editedTaskProject,
    });

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

    // Save the updated state to localStorage
    saveState();

    // Re-render the UI to reflect the changes
    renderProjectsCallback();

    // Update the expanded task modal with the new details
    const expandedTaskModal = document.querySelector("#expanded-task-modal");
    expandedTaskModal.querySelector("#task-title").textContent =
      currentTask.title || "No title";
    expandedTaskModal.querySelector("#task-description").textContent =
      currentTask.description || "No description";
    expandedTaskModal.querySelector("#task-due-date").textContent =
      currentTask.dueDate
        ? format(parseISO(currentTask.dueDate), "MMMM d, yyyy")
        : "No due date";
    expandedTaskModal.querySelector("#task-priority").textContent =
      currentTask.priority || "No priority";
    expandedTaskModal.querySelector("#task-project").textContent =
      currentTask.project || "No project";

    // Update the priority circle's data-priority attribute
    const priorityCircle = expandedTaskModal.querySelector(".task-circle");
    if (priorityCircle) {
      priorityCircle.setAttribute("data-priority", currentTask.priority);
    }

    // Switch back to view mode
    toggleEditMode(false);
  }
}
