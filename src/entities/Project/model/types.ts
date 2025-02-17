import type {ITask} from "src/entities/Task";
import type {Dispatch, SetStateAction} from "react";

export enum ProjectStatus {
  active = 'Active',
  pending = 'Pending',
  closed = 'Closed',
  done = 'Done',
}

export interface IProject {
  id: number,
  title: string,
  description: string,
  imageSrc: number,
  status: ProjectStatus,
  tasks?: ITask[],
}

export interface IProjectsContext {
  projects: IProject[] | null,

  setProjects: Dispatch<SetStateAction<IProject[] | null>>,
}