// DOM manipulation logic

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

  project.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-circle ${todo.completed ? "completed" : ""}"></span>
      <span class="task-text">${todo.title}</span>
    `;
    taskList.appendChild(li);
  });

  return taskList; // Return the ul element
}
