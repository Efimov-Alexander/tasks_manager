import {createContext} from "react";

import {INIT_PROJECTS} from "../constants/data";

import type {IProjectsContext} from "../model/types";

export const ProjectsContext = createContext<IProjectsContext>({
  projects: INIT_PROJECTS,
  setProjects: () => {},
});