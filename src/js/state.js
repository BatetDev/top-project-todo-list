// state.js
// Centralized state management for projects

// Initialize the projects array with default "Inbox" project
let projects = [];

// Function to initialize the state (load from localStorage if available)
export function initializeState() {
  const savedProjects = JSON.parse(localStorage.getItem("projects"));
  if (savedProjects && Array.isArray(savedProjects)) {
    projects = savedProjects;
  } else {
    // Default project if no data exists
    projects = [{ name: "Inbox", todos: [] }];
  }
}

// Getter for projects
export function getProjects() {
  return projects;
}

// Setter for projects
export function setProjects(newProjects) {
  projects = newProjects;
}

// Function to add a new project
export function addProject(newProject) {
  projects.push(newProject);
}

// Function to save the current state to localStorage
export function saveState() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
