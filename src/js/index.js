import "../styles/main.css";

import {
  createTodo,
  toggleTodoCompletion,
  updateTodoPriority,
} from "./todos.js";
import { createProject, addTodoToProject } from "./projects.js";

// Create Inbox (default project)
const inbox = createProject("Inbox");

// Add sample todos to the default project
inbox.todos.push(
  createTodo(
    "Commit to a worthy task",
    "Add interactivity for task completion.",
    "2025-03-15",
    "high"
  ),
  createTodo(
    "Refactor code",
    "Organize JavaScript into modules.",
    "2025-03-20",
    "medium"
  ),
  createTodo(
    "Style the app",
    "Apply steampunk-inspired design.",
    "2025-03-25",
    "low"
  )
);

// Render todos for a single project
function renderTodos(project) {
  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  project.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-circle ${todo.completed ? "completed" : ""}"></span>
      <span class="task-text">${todo.title}</span>
    `;
    taskList.appendChild(li);
  });

  return taskList; // Return the ul element
}

// Render all projects
function renderProjects(projects) {
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

// Call renderProjects to display the Inbox
const projects = [inbox];
renderProjects(projects);

// Function to populate the project picker dropdown
function populateProjectPicker(projects) {
  const projectPicker = document.querySelector("#task-project");

  // Clear existing options
  projectPicker.innertHTML = "";

  // Add an option element for each project
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectPicker.appendChild(option);
  });
}

// Call populateProjectPicker when the app starts
populateProjectPicker(projects);

// Select Add Task Button
const addTaskButton = document.querySelector("#add-task-btn");

// Modal
const modal = document.querySelector("#add-task-modal");
const modalContent = document.querySelector(".modal-content");
const closeModalButton = document.querySelector(".close-modal");

// Show modal and hide "+" button
addTaskButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
  addTaskButton.style.display = "none";
});

// Hide modal and show the "+" button
closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  addTaskButton.style.display = "block";
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

// Select Task Form
const addTaskForm = document.querySelector("#add-task-form");

// Prevent default form submission; capture user input, create new todo, add it to selected project
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page from reloading

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

  // Log the updated project to the console
  console.log("Update Project:", selectedProject);

  // Reset form fields
  addTaskForm.reset();
});
