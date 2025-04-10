// dom-render.js
import { getProjects } from "./state.js";
import { openExpandedTaskModal } from "./dom-modals.js";
import { toggleTaskCompletion } from "./project-todo.js";

import { format, parseISO } from "date-fns";

// Render all projects
export function renderProjects() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const projects = getProjects();

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;
    projectCard.appendChild(projectTitle);

    // Always pass false to show only incomplete tasks
    const taskList = renderTodos(project, false);
    projectCard.appendChild(taskList);

    main.appendChild(projectCard);
  });
}

// Render todos for a single project
export function renderTodos(project, filterCompleted = false) {
  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  // Filter tasks to show only incomplete ones
  const filteredTodos = project.todos.filter((todo) => !todo.completed);

  // Map the filtered todos with their original indices
  const todosWithIndices = filteredTodos.map((todo) => ({
    todo,
    index: project.todos.indexOf(todo),
  }));

  todosWithIndices.forEach(({ todo, index }) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    li.innerHTML = `
      <span class="task-circle" 
            data-action="toggle" 
            data-priority="${todo.priority || "medium"}"></span>
      <span class="task-text">${todo.title}</span>
          <span class="task-due-date">
      ${todo.dueDate ? format(parseISO(todo.dueDate), "MMM d") : ""}
    </span>
    `;
    taskList.appendChild(li);
  });

  // Use event delegation to handle task clicks
  taskList.addEventListener("click", (e) => {
    const clickedTask = e.target.closest("li"); // Find the closest <li> element
    if (!clickedTask) return; // Exit if no task is clicked

    const taskIndex = clickedTask.dataset.index; // Get the task index
    const task = project.todos[taskIndex]; // Get the corresponding task

    // Check if the click was on the task completion circle
    if (e.target.matches(".task-circle[data-action='toggle']")) {
      console.log("Task circle clicked. Toggling completion...");
      toggleTaskCompletion(task, clickedTask, e.target);
      return;
    }

    // Otherwise, open the expanded task modal
    console.log("Task clicked:", task);
    openExpandedTaskModal(task);
  });

  return taskList;
}

// Function to populate the project picker dropdown
export function populateProjectPicker(
  projects,
  selectElement,
  selectedProject = null
) {
  // Add type checking and validation
  if (!selectElement || !(selectElement instanceof HTMLSelectElement)) {
    console.error("Invalid select element:", selectElement);
    return;
  }

  // Clear existing options
  while (selectElement.firstChild) {
    selectElement.removeChild(selectElement.firstChild);
  }

  try {
    // Add an option element for each project
    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.name;
      option.textContent = project.name;
      if (selectedProject && project.name === selectedProject) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating project picker:", error);
    console.log("SelectElement:", selectElement);
    console.log("Projects:", projects);
  }
}

// Render the Archive view
export function renderArchiveView() {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content area

  const projects = getProjects();

  // Flatten all tasks from all projects into a single array
  const allTasks = projects.flatMap((project) => project.todos);

  // Filter only completed tasks
  const completedTasks = allTasks.filter((task) => task.completed);

  // Create a container for the archive
  const archiveContainer = document.createElement("div");
  archiveContainer.classList.add("archive-container");

  if (completedTasks.length === 0) {
    // Fallback message if there are no completed tasks
    archiveContainer.textContent = "No completed tasks to display.";
  } else {
    // Render each completed task
    completedTasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("archive-task");
      taskElement.innerHTML = `
        <span class="task-text">${task.title}</span>
        <span class="task-due-date">
          ${task.dueDate ? format(parseISO(task.dueDate), "MM/dd/yyyy") : ""}
        </span>
      `;
      archiveContainer.appendChild(taskElement);
    });
  }

  main.appendChild(archiveContainer);
}
