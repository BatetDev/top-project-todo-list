// state.js
// Centralized state management for projects and persistence

// state.js

let projects = [];

// Initialize the state (load from localStorage if available)
export function initializeState() {
  try {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      if (Array.isArray(parsedProjects)) {
        projects = parsedProjects;
      } else {
        console.error(
          "Invalid state found in localStorage. Initializing empty state."
        );
        projects = [];
      }
    } else {
      console.log("No saved state found. Initializing empty state.");
      projects = [];
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    console.log("Initializing empty state.");
    projects = [];
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
