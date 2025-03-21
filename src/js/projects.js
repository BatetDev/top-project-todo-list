// projects.js

// Project management logic

// Factory function for creating projects
export function createProject(name) {
  return {
    name,
    todos: [],
  };
}

// Add a todo to a project's todos array
export function addTodoToProject(project, todo) {
  project.todos.push(todo);
}
