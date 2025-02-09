import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.scss';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import { IProject} from "../../entities/Project";
import {
  getStorageProjects, initData,
  ProjectsContext,
  setStorageProjects,
} from "../model/appHelper";
import {routesConfig} from "../model/routesConfig";

initData();

function App() {
  const [projects, setProjects] = useState<IProject[]>(getStorageProjects());

  useEffect(() => {setStorageProjects(projects)}, [projects])

  return (
    <ProjectsContext.Provider value={{ setProjects, projects }}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            {routesConfig.map((route) => <Route key={route.path} path={route.path} element={route.component} />)}
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </ProjectsContext.Provider>
  );
}

export default App;
