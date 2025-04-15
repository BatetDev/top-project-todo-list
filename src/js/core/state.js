// core/state.js

import { createProject, addTodoToProject, createTodo } from "./project-todo.js";

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
      createTodo(
        "Study Socrates' Dialogues",
        "Reflect on the Socratic method of questioning.",
        "2025-04-20",
        "high"
      )
    );
    addTodoToProject(
      inboxProject,
      createTodo(
        "Write a treatise on virtue",
        "Explore Aristotle's concept of eudaimonia.",
        "2025-04-22",
        "medium"
      )
    );
    addTodoToProject(
      inboxProject,
      createTodo(
        "Experiment with levers",
        "Channel Archimedes: 'Give me a place to stand, and I shall move the Earth.'",
        "2025-04-25",
        "low"
      )
    );

    projects.push(inboxProject);

    const symposiumProject = createProject("13th Athenian Symposium");

    addTodoToProject(
      symposiumProject,
      createTodo(
        "Prove the Pythagorean theorem",
        "Demonstrate a² + b² = c² geometrically.",
        "2025-05-01",
        "high"
      )
    );
    addTodoToProject(
      symposiumProject,
      createTodo(
        "Debate Zeno's Paradoxes",
        "Discuss the impossibility of motion and infinite divisibility.",
        "2025-05-05",
        "medium"
      )
    );
    addTodoToProject(
      symposiumProject,
      createTodo(
        "Compose a hymn to Apollo",
        "Celebrate reason, light, and prophecy.",
        "2025-05-10",
        "low"
      )
    );

    projects.push(symposiumProject);

    saveState();
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
