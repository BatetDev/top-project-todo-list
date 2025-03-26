// dom-render.js
import { getProjects } from "./state.js";

// Render all projects
export function renderProjects() {
  const projects = getProjects(); // Use centralized state
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

    // Add the task list by calling renderTodos
    const taskList = renderTodos(project);
    projectCard.appendChild(taskList);

    // Append the project card to the main content
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
      <span class="task-circle ${todo.completed ? "completed" : ""}"></span>
      <span class="task-text">${todo.title}</span>
    `;
    taskList.appendChild(li);
  });

  // Use event delegation to handle task clicks
  taskList.addEventListener("click", (e) => {
    const clickedTask = e.target.closest("li"); // Find the closest <li> element
    if (clickedTask) {
      const taskIndex = clickedTask.dataset.index; // Get the task index
      const task = project.todos[taskIndex]; // Get the corresponding task
      console.log("Task clicked:", task);
      openExpandedTaskModal(task);
    }
  });

  return taskList; // Return the ul element
}

// Function to populate the project picker dropdown
export function populateProjectPicker(
  selectElement,
  selectedProject = "Inbox"
) {
  const projects = getProjects(); // Use centralized state

  // Ensure the selectElement exists
  if (!selectElement) {
    console.error("Invalid selectElement passed to populateProjectPicker.");
    return;
  }

  // Clear existing options
  selectElement.innerHTML = "";

  // Add an option element for each project
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;

    // Mark the option as selected if it matches the specified project
    if (project.name === selectedProject) {
      option.selected = true;
    }

    selectElement.appendChild(option);
  });
}
