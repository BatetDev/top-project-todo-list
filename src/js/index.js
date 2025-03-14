import "../styles/main.css";

import { createTodo, createProject } from "./helpers.js";

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

// Prevent default form submission
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted!");
});
