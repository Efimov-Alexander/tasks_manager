import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

import { setStorageValue} from "src/shared";
import {PROJECTS_KEY, ProjectsContext} from "src/entities/Project";

import {getStorageProjects, initData} from "../lib/helpers";
import {routesConfig} from "../config/routesConfig";

import type {IProject} from "src/entities/Project";

import './App.scss';

initData();

function App() {
  const [projects, setProjects] = useState<IProject[] | null>(getStorageProjects());

  useEffect(() => {setStorageValue({value: projects, key: PROJECTS_KEY})}, [projects])

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
