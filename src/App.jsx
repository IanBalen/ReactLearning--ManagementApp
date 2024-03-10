import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectedSelected from "./components/NoProjectedSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject(projectData) {
    setProjectsState((prevProjectsState) => {
      const id = Math.random();
      const newProject = {
        ...projectData,
        id: id,
      };

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  function handleDeleteProject(projectId) {
    setProjectsState((prevProjectsState) => {
      const updatedProjects = prevProjectsState.projects.filter(
        (project) => project.id !== projectId
      );

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleCreateProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: projectId,
      };
    });
  }

  let project = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={project}
      handleDeleteProject={handleDeleteProject}
    />
  );
  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectedSelected handleCreateProject={handleCreateProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        handleCancelProject={handleCancelProject}
        handleAddProject={handleAddProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        handleCreateProject={handleCreateProject}
        handleSelectProject={handleSelectProject}
        projects={projectsState.projects}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
