import {ITask, TaskStatus} from "src/features/Task";

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
  tasks: {
    [TaskStatus.queue]: ITask[],
    [TaskStatus.development]: ITask[],
    [TaskStatus.done]: ITask[],
  }
}