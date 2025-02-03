import React, {useState, createContext, SetStateAction, Dispatch, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ProjectsSelection from "src/pages/ProjectsSelection";
import ProjectTasks from "src/pages/ProjectTasks";

import {initProjects} from "../constants/Data";

import './App.scss';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {getProjects, IProject} from "../../entities/Project";

export interface IProjectsContext {
  projects: IProject[],
  setProjects: Dispatch<SetStateAction<IProject[]>>,
}

export const ProjectsContext = createContext<IProjectsContext>({
  projects: initProjects,
  setProjects: () => {},
});

if (!getProjects().length) localStorage.setItem(`projects`, JSON.stringify(initProjects));

function App() {
  const [projects, setProjects] = useState<IProject[]>(getProjects());

  useEffect(() => {localStorage.setItem('projects', JSON.stringify(projects))}, [projects])

  return (
    <ProjectsContext.Provider value={{ setProjects, projects }}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<ProjectsSelection />} />
            <Route path="projects/:projectId" element={<ProjectTasks />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ProjectsContext.Provider>
  );
}

export default App;
