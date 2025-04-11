// core/state.js

import { createProject, addTodoToProject } from "./project-todo.js";

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

  // Add default "Inbox" project if no projects exist
  if (projects.length === 0) {
    const inboxProject = createProject("Inbox");
    addTodoToProject(
      inboxProject,
      createTodo("Sample Task", "Description", "2025-03-20", "medium")
    );
    projects.push(inboxProject); // Add the Inbox project to the state
    saveState(); // Save the updated state to localStorage
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
    console.error("Failed to save projects to localStorage:", error);
  }
}

// Function to clear all completed tasks from all projects
export function clearArchive() {
  projects.forEach((project) => {
    project.todos = project.todos.filter((todo) => !todo.completed);
  });
  saveState();
}
