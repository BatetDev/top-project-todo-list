// Data persistence logic

// Save projects to localStorage
export function saveProjects(projects) {
  try {
    const serializedProjects = JSON.stringify(projects);
    if (serializedProjects === undefined || serializedProjects === null) {
      console.error("Failed to serialize projects. Data is invalid.");
      return;
    }
    localStorage.setItem("projects", serializedProjects);
  } catch (error) {
    console.error("Failed to save projects:", error);
  }
}

// Load projects from localStorage
export function loadProjects() {
  const savedProjects = localStorage.getItem("projects");
  if (!savedProjects) {
    return [];
  }
  try {
    return JSON.parse(savedProjects);
  } catch (error) {
    console.error("Failed to parse saved projects:", error);
    localStorage.removeItem("projects"); // Clear corrupted data
    return [];
  }
}
