// DOM manipulation logic

let currentTask = null; // Variable to store the currently selected task
export { currentTask }; // Export currentTask for use in other modules

// Render all projects
export function renderProjects(projects) {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear the main content before rendering

  projects.forEach((project) => {
    // Create the project card
    const projectCard = document.createElement("article");
    projectCard.classList.add("project-card");

    // Add the project title
    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = project.name;
    projectCard.appendChild(projectTitle);

    // Add the task list by calling renderTodos
    const taskList = renderTodos(project);
    projectCard.appendChild(taskList);

    // Append the project card to the main content
    main.appendChild(projectCard);
  });
}

// Render todos for a single project
export function renderTodos(project) {
  const taskList = document.createElement("ul");
  taskList.classList.add("task-list");

  project.todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.dataset.index = index; // Add an index to identify the task
    li.innerHTML = `
      <span class="task-circle ${todo.completed ? "completed" : ""}"></span>
      <span class="task-text">${todo.title}</span>
    `;
    taskList.appendChild(li);
  });

  // Use event delegation to handle task clicks
  taskList.addEventListener("click", (e) => {
    const clickedTask = e.target.closest("li"); // Find the closest <li> element
    if (clickedTask) {
      const taskIndex = clickedTask.dataset.index; // Get the task index
      const task = project.todos[taskIndex]; // Get the corresponding task
      console.log("Task clicked:", task);
      openExpandedTaskModal(task);
    }
  });

  return taskList; // Return the ul element
}

// Function to populate the project picker dropdown
export function populateProjectPicker(projects) {
  const projectPicker = document.querySelector("#task-project");

  // Clear existing options
  projectPicker.innerHTML = "";

  // Add an option element for each project
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectPicker.appendChild(option);
  });
}

// Select the expanded task modal and its elements
const expandedTaskModal = document.querySelector("#expanded-task-modal");

// Function to open the expanded task modal
export function openExpandedTaskModal(task) {
  console.log("Task passed to openExpandedTaskModal:", task);

  // Store the current task
  currentTask = task;

  // Populate the modal with task details
  expandedTaskModal.querySelector("#task-title").textContent =
    task.title || "No title";
  expandedTaskModal.querySelector("#task-description").textContent =
    task.description || "No description";
  expandedTaskModal.querySelector("#task-due-date").textContent =
    task.dueDate || "No due date";
  expandedTaskModal.querySelector("#task-priority").textContent =
    task.priority || "No priority";
  expandedTaskModal.querySelector("#task-project").textContent =
    task.project || "No project";

  // Show the modal by removing the "hidden" class
  expandedTaskModal.classList.remove("hidden");
}

// Function to close the expanded task modal
function closeExpandedTaskModal() {
  // Hide the modal by adding the "hidden" class
  console.log("closeExpandedTaskModal is closing modal...");
  expandedTaskModal.classList.add("hidden");
}

// Close modal when clicking outside the modal content
expandedTaskModal.addEventListener("click", (e) => {
  const modalContent = expandedTaskModal.querySelector(".modal-content");
  console.log("Clicked inside #expanded-task-modal");

  if (!modalContent.contains(e.target)) {
    console.log("Clicked outside .modal-content, closing modal...");
    closeExpandedTaskModal();

    // Reset edit mode to ensure  the expanded task modal is shown
    toggleEditMode(false);
  }
});

// Select modal elements
export const taskDetails = expandedTaskModal.querySelector(".task-details");
export const editTaskForm = expandedTaskModal.querySelector("#edit-task-form");

// Function to toggle between view and edit modes
export function toggleEditMode(isEditing) {
  console.log(
    "Toggling edit mode:",
    isEditing ? "Switching to edit mode" : "Switching to view mode"
  );

  if (isEditing) {
    taskDetails.classList.add("hidden"); // Hide task details
    editTaskForm.classList.remove("hidden"); // Show edit form
  } else {
    taskDetails.classList.remove("hidden"); // Show task details
    editTaskForm.classList.add("hidden"); // Hide edit form
  }
}
