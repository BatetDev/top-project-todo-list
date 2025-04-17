import { getProjects } from "../core/state";
import {
  showAddProjectModal,
  renameProject,
  deleteProject,
} from "../components/project-ui";
import fallbackProjects from "../../assets/images/fallback_projects.jpg";

// Function to render the Projects view
export function renderProjectsView() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Create a container for the header and add project button
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("projects-header-container");

  // Header title
  const header = document.createElement("h2");
  header.textContent = "My Projects";
  header.classList.add("projects-title");
  headerContainer.appendChild(header);

  // Add Project button
  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+";
  addProjectButton.classList.add("add-project-button");
  addProjectButton.addEventListener("click", () => {
    showAddProjectModal();
  });
  headerContainer.appendChild(addProjectButton);

  main.appendChild(headerContainer);

  const projects = getProjects();

  // Exclude the "Inbox" project
  const filteredProjects = projects.filter(
    (project) => project.name !== "Inbox"
  );

  if (filteredProjects.length === 0) {
    // Fallback wrapper for image and message
    const fallbackWrapper = document.createElement("div");
    fallbackWrapper.classList.add("fallback-wrapper");

    // Fallback image
    const fallbackImage = document.createElement("img");
    fallbackImage.src = fallbackProjects;
    fallbackImage.alt = "No custom projects";
    fallbackImage.classList.add("fallback-image");

    // Fallback message
    const fallbackMessage = document.createElement("p");
    fallbackMessage.textContent = "By Zeus, No Projects!";
    fallbackMessage.classList.add("fallback-message");

    // Append image and message to the wrapper
    fallbackWrapper.appendChild(fallbackImage);
    fallbackWrapper.appendChild(fallbackMessage);

    // Append the wrapper to the main container
    main.appendChild(fallbackWrapper);
  } else {
    // Render each custom project
    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    filteredProjects.forEach((project) => {
      const li = document.createElement("li");
      li.classList.add("project-item");

      // Project name
      const projectName = document.createElement("span");
      projectName.textContent = project.name;
      li.appendChild(projectName);

      // Actions container (edit and delete icons)
      const actionsContainer = document.createElement("div");
      actionsContainer.classList.add("project-actions");

      // Edit icon
      const editIcon = document.createElement("i");
      editIcon.dataset.lucide = "settings";
      editIcon.classList.add("project-action-icon", "edit-project");
      editIcon.title = "Rename Project";
      actionsContainer.appendChild(editIcon);

      // Delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.dataset.lucide = "trash-2";
      deleteIcon.classList.add("project-action-icon", "delete-project");
      deleteIcon.title = "Delete Project";
      actionsContainer.appendChild(deleteIcon);

      // Add event delegation to the container
      actionsContainer.addEventListener("click", (e) => {
        const target = e.target.closest(".project-action-icon");
        if (!target) return;

        e.stopPropagation();
        if (target.classList.contains("edit-project")) {
          renameProject(project);
        } else if (target.classList.contains("delete-project")) {
          deleteProject(project);
        }
      });

      li.appendChild(actionsContainer);
      projectList.appendChild(li);
    });

    main.appendChild(projectList);
  }

  // Create the Lucide icons
  lucide.createIcons();
}
