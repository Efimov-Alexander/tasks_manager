import {IProject} from "../../entities/Project";
import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IProjectsContext {
  projects: IProject[],

  setProjects: Dispatch<SetStateAction<IProject[]>>,
}

export interface IRoute {
  path: string,
  component: ReactNode,
}