/* index.js */
import "../styles/main.css";
import {
  initializeState,
  getProjects,
  saveState,
  addProject,
} from "./state.js";
import { createProject, addTodoToProject } from "./project-todo.js";
import { renderProjects, populateProjectPicker } from "./dom-render.js";
import { displayAddTaskModal } from "./modal-logic.js";
import {
  handleAddTaskFormSubmit,
  handleEditTaskFormSubmit,
} from "./form-handlers.js";

// Initialize app state
initializeState();

// Get the centralized projects array
const projects = getProjects();

// Add default project ("Inbox") only if no projects exist
if (projects.length === 0) {
  const inboxProject = createProject("Inbox");
  addTodoToProject(
    inboxProject,
    createTodo("Sample Task", "Description", "2025-03-20", "medium")
  );
  saveState();
}

// Populate project picker and render initial projects
const projectPicker = document.querySelector("#task-project");

if (projectPicker) {
  populateProjectPicker(projects, projectPicker);
} else {
  console.error("Project picker element (#task-project) not found.");
}

renderProjects(projects);

// Display add task modal and initializes it's functionality
displayAddTaskModal(() => {
  renderProjects(projects);
  saveState();
});

// Handle add task form submissions
handleAddTaskFormSubmit(document.querySelector("#add-task-form"), () => {
  renderProjects(projects);
  saveState();
});

// Handle form submissions for editing tasks
handleEditTaskFormSubmit(() => {
  renderProjects(projects);
  saveState();
});

// Select the main content area and navigation buttons
const main = document.querySelector("main");
const todayTab = document.querySelector("#today-tab");
const searchTab = document.querySelector("#search-tab");
const projectsTab = document.querySelector("#projects-tab");

// Function to render the default view (Today)
function renderTodayView() {
  console.log("Rendering Today view...");
  const projects = getProjects();
  renderProjects(projects);
}

// Function to render the Projects view
function renderProjectsView() {
  console.log("Rendering Projects view...");
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content area

  // Create a container for the header and add project button
  const headerContainer = document.createElement("div");
  headerContainer.style.display = "flex";
  headerContainer.style.justifyContent = "space-between";
  headerContainer.style.alignItems = "center";
  headerContainer.style.marginBottom = "20px";

  // Create a header for the Projects screen
  const header = document.createElement("h2");
  header.textContent = "My Projects";
  header.style.color = "#b87333";
  header.style.margin = "0";
  headerContainer.appendChild(header);

  // Add a "+" button to add new projects
  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+";
  addProjectButton.style.backgroundColor = "#b87333";
  addProjectButton.style.color = "#fafafa";
  addProjectButton.style.border = "none";
  addProjectButton.style.borderRadius = "5px";
  addProjectButton.style.padding = "5px 10px";
  addProjectButton.style.fontSize = "1rem";
  addProjectButton.style.cursor = "pointer";
  addProjectButton.style.fontWeight = "bold";

  // Add click event listener to open the Add Project Modal
  addProjectButton.addEventListener("click", () => {
    console.log("Add Project button clicked. Opening modal...");
    showAddProjectModal();
  });

  headerContainer.appendChild(addProjectButton);
  main.appendChild(headerContainer);

  // Create a container for the project list
  const projectList = document.createElement("ul");
  projectList.style.listStyleType = "none";
  projectList.style.padding = "0";

  // Get the list of projects from centralized state
  const projects = getProjects();

  // Add each project to the list
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";
    li.style.padding = "10px";
    li.style.backgroundColor = "#2b2b2b";
    li.style.borderRadius = "5px";
    li.style.color = "#fafafa";
    li.style.cursor = "pointer";

    // Project name
    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    li.appendChild(projectName);

    // Actions container (edit and delete icons)
    if (project.name !== "Inbox") {
      const actionsContainer = document.createElement("div");
      actionsContainer.style.display = "flex";
      actionsContainer.style.gap = "10px";

      // Edit icon
      const editIcon = document.createElement("span");
      editIcon.textContent = "✏️";
      editIcon.style.cursor = "pointer";
      editIcon.title = "Rename Project";
      editIcon.addEventListener("click", () => {
        console.log(`Edit icon clicked for project: ${project.name}`);
        renameProject(project);
      });
      actionsContainer.appendChild(editIcon);

      // Delete icon
      const deleteIcon = document.createElement("span");
      deleteIcon.textContent = "🗑️";
      deleteIcon.style.cursor = "pointer";
      deleteIcon.title = "Delete Project";
      deleteIcon.addEventListener("click", () => {
        console.log(`Delete icon clicked for project: ${project.name}`);
        deleteProject(project);
      });
      actionsContainer.appendChild(deleteIcon);

      li.appendChild(actionsContainer);
    }

    projectList.appendChild(li);
  });

  main.appendChild(projectList);
}

// Function to render the Search view (placeholder)
function renderSearchView() {
  console.log("Rendering Search view...");
  main.innerHTML = "<p>Search functionality coming soon...</p>";
}

// Add event listeners to navigation buttons
todayTab.addEventListener("click", () => {
  setActiveTab(todayTab);
  renderTodayView();
});

searchTab.addEventListener("click", () => {
  setActiveTab(searchTab);
  renderSearchView();
});

projectsTab.addEventListener("click", () => {
  setActiveTab(projectsTab);
  renderProjectsView();
});

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  activeTab.classList.add("active");
}

// Initialize the default view
renderTodayView();

// Function to show the Add Project Modal
function showAddProjectModal() {
  const modal = document.querySelector("#add-project-modal");
  modal.classList.remove("hidden");
}

// Function to close the Add Project Modal
function closeAddProjectModal() {
  const modal = document.querySelector("#add-project-modal");
  modal.classList.add("hidden");
  const form = document.querySelector("#add-project-form");
  form.reset(); // Reset the form fields
}

// Add event listener to the Cancel button
document
  .querySelector("#cancel-add-project-btn")
  .addEventListener("click", () => {
    console.log("Cancel button clicked. Closing Add Project modal...");
    closeAddProjectModal();
  });

// Add event listener to close the modal when clicking outside
document.querySelector("#add-project-modal").addEventListener("click", (e) => {
  // Only close if clicking directly on the modal backdrop
  if (e.target.id === "add-project-modal") {
    console.log("Clicked outside modal content. Closing Add Project modal....");
    closeAddProjectModal();
  }
});

// Function to handle form submission in the Add Project Modal
function handleAddProjectFormSubmit() {
  const addProjectForm = document.querySelector("#add-project-form");
  const modal = document.querySelector("#add-project-modal");

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Get the project name from the input field
    const projectNameInput = document.querySelector("#project-name");
    const projectName = projectNameInput.value.trim();

    // Validate the project name
    if (!projectName) {
      alert("Project name cannot be empty.");
      return;
    }

    // Unique name check
    const projects = getProjects();
    const isDuplicate = projects.some(
      (project) => project.name.toLowerCase() === projectName.toLowerCase()
    );

    if (isDuplicate) {
      alert("A project with this name already exists.");
      return;
    }

    // Create the new project
    const newProject = createProject(projectName);

    // Add the new project to the centralized state
    addProject(newProject);

    // Save the updated state to localStorage
    saveState();

    // Dynamically update the project list
    renderProjectsView();

    // Reset the form fields and close the modal
    projectNameInput.value = "";
    modal.classList.add("hidden");

    console.log(`Project "${projectName}" added successfully.`);
  });
}

// Call the function to attach the event listener
handleAddProjectFormSubmit();

// Function to rename a project
function renameProject(project) {
  const newName = prompt("Enter a new name for the project:", project.name);
  if (!newName || newName.trim() === "") {
    alert("Project name cannot be empty.");
    return;
  }

  const projects = getProjects();
  const isDuplicate = projects.some(
    (p) => p.name.toLowerCase() === newName.toLowerCase() && p !== project
  );

  if (isDuplicate) {
    alert("A project with this name already exists.");
    return;
  }

  project.name = newName.trim();
  saveState();
  renderProjectsView();
}

// Function to delete a project
function deleteProject(project) {
  if (!confirm(`Are you sure you want to delete "${project.name}"?`)) return;

  const projects = getProjects();
  const inbox = projects.find((p) => p.name === "Inbox");

  // Move tasks to Inbox
  if (inbox && project.todos.length > 0) {
    project.todos.forEach((todo) => {
      todo.project = "Inbox";
      inbox.todos.push(todo);
    });
  }

  // Remove the project
  const index = projects.indexOf(project);
  if (index > -1) {
    projects.splice(index, 1);
  }

  saveState();
  renderProjectsView();
}
