// form-handlers.js
import { createTodo } from "./project-todo.js";
import { addTodoToProject } from "./project-todo.js";
import { toggleEditMode, currentTask } from "./dom-modals.js";
import { getProjects, saveState } from "./state.js";

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

// Attach event listener for saving changes
export function handleEditTaskFormSubmit() {
  const editTaskForm = document.querySelector("#edit-task-form");
  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

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

    // Log the located task for debugging purposes
    console.log("Located Task:", project.todos[taskIndex]);

    // TODO: Update the task's properties with the new values
  });
}
