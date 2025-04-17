import { getProjects, saveState } from "../core/state.js";
import { format, parseISO } from "date-fns";
import fallbackArchive from "../../assets/images/fallback_archive.jpg";

// Render the Archive view
export function renderArchiveView() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const projects = getProjects();

  // Flatten all tasks from all projects into a single array
  const allTasks = projects.flatMap((project) => project.todos);

  // Filter only completed tasks
  const completedTasks = allTasks.filter((task) => task.completed);

  // Create a container for the archive
  const archiveContainer = document.createElement("div");
  archiveContainer.classList.add("archive-container");

  if (completedTasks.length === 0) {
    // Fallback message and image if there are no completed tasks
    const fallbackWrapper = document.createElement("div");
    fallbackWrapper.classList.add("fallback-wrapper");

    const fallbackImage = document.createElement("img");
    fallbackImage.src = fallbackArchive;
    fallbackImage.alt = "No archived tasks";
    fallbackImage.classList.add("fallback-image");

    const fallbackMessage = document.createElement("p");
    fallbackMessage.textContent = "The archive is empty.";
    fallbackMessage.classList.add("fallback-message");

    fallbackWrapper.appendChild(fallbackImage);
    fallbackWrapper.appendChild(fallbackMessage);
    archiveContainer.appendChild(fallbackWrapper);
  } else {
    // Render each completed task
    completedTasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("archive-task");
      taskElement.innerHTML = `
        <span class="task-text">${task.title}</span>
        <span class="task-completed-label">Completed on</span>
        <span class="task-completed-date">
          ${
            task.completedDate
              ? format(parseISO(task.completedDate), "MM/dd/yyyy")
              : ""
          }
        </span>
      `;
      archiveContainer.appendChild(taskElement);
    });
  }

  // Add the "Clear Archive" button
  const clearArchiveButton = document.createElement("button");
  clearArchiveButton.textContent = "Clear Archive";
  clearArchiveButton.classList.add("clear-archive-button");
  clearArchiveButton.addEventListener("click", () => {
    const isConfirmed = confirm(
      "Are you sure you want to permanently delete all archived tasks? This action cannot be undone."
    );
    if (isConfirmed) {
      clearArchive();
      renderArchiveView();
    }
  });
  archiveContainer.appendChild(clearArchiveButton);

  main.appendChild(archiveContainer);
}

// Function to clear all completed tasks from all projects
export function clearArchive() {
  const projects = getProjects();

  projects.forEach((project) => {
    project.todos = project.todos.filter((todo) => !todo.completed);
  });

  saveState();
}
