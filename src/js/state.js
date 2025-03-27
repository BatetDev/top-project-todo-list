// state.js
// Centralized state management for projects and persistence

let projects = [];

// Initialize the state (load from localStorage if available)
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
  saveState();
}

// Function to add a new project
export function addProject(newProject) {
  projects.push(newProject);
  saveState();
}

// Function to save the current state to localStorage
export function saveState() {
  try {
    localStorage.setItem("projects", JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save projects:", error);
  }
}
