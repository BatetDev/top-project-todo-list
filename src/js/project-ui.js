// project-ui.js
import { getProjects, addProject, saveState } from "./state.js";
import { renderProjectsView } from "./navigation.js";
import { createProject } from "./project-todo.js";

// Function to show the Add Project Modal
export function showAddProjectModal() {
  const modal = document.querySelector("#add-project-modal");
  modal.classList.remove("hidden");
}

// Function to close the Add Project Modal
export function closeAddProjectModal() {
  const modal = document.querySelector("#add-project-modal");
  modal.classList.add("hidden");
  const form = document.querySelector("#add-project-form");
  form.reset(); // Reset the form fields
}

// Function to handle form submission in the Add Project Modal
export function handleAddProjectFormSubmit() {
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

// Function to rename a project
export function renameProject(project) {
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
export function deleteProject(project) {
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
