import {ITask} from "src/entities/Task";

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
  imageSrc: string
  status: ProjectStatus,
  tasks?: ITask[],
}