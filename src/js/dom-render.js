// dom-render.js
import { getProjects } from "./state.js";
import { openExpandedTaskModal } from "./dom-modals.js";
import { toggleTodoCompletion } from "./project-todo.js";

// Render all projects
export function renderProjects() {
  const projects = getProjects(); // Fetch the current state of projects
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content before rendering

  projects.forEach((project) => {
    // Create the project card
    const projectCard = document.createElement("article");
    projectCard.classList.add("project-card");

    // Add the project title
    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = project.name;
    projectCard.appendChild(projectTitle);

    // Add the task list
    const taskList = renderTodos(project);
    projectCard.appendChild(taskList);

    main.appendChild(projectCard);
  });
}

// Render todos for a single project
export function renderTodos(project) {
  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  project.todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.dataset.index = index; // Add an index to identify the task
    li.innerHTML = `
      <span class="task-circle ${
        todo.completed ? "completed" : ""
      }" data-action="toggle"></span>
      <span class="task-text">${todo.title}</span>
    `;
    taskList.appendChild(li);
  });

  // Use event delegation to handle task clicks
  taskList.addEventListener("click", (e) => {
    const clickedTask = e.target.closest("li"); // Find the closest <li> element
    if (!clickedTask) return; // Exit if no task is clicked

    const taskIndex = clickedTask.dataset.index; // Get the task index
    const task = project.todos[taskIndex]; // Get the corresponding task

    // Check if the click was on the task completion circle
    if (e.target.matches(".task-circle[data-action='toggle']")) {
      console.log("Task circle clicked. Toggling completion...");
      toggleTaskCompletion(task, clickedTask, e.target);
      return;
    }

    // Otherwise, open the expanded task modal
    console.log("Task clicked:", task);
    openExpandedTaskModal(task);
  });

  return taskList;
}

// Function to toggle task completion
function toggleTaskCompletion(task, taskElement, circleElement) {
  console.log("Toggling completion for task:", task);
  task.completed = !task.completed; // Toggle the completed status

  // Update UI elements
  taskElement.classList.toggle("completed", task.completed);
  circleElement.classList.toggle("completed", task.completed);
}

// Function to populate the project picker dropdown
export function populateProjectPicker(
  projects,
  selectElement,
  selectedProject = null
) {
  // Add type checking and validation
  if (!selectElement || !(selectElement instanceof HTMLSelectElement)) {
    console.error("Invalid select element:", selectElement);
    return;
  }

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
      if (selectedProject && project.name === selectedProject) {
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
