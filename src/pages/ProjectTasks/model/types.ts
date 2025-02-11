import {IProject} from "../../../entities/Project";
import {ITask} from "../../../entities/Task";

export interface IGetProjectByIdParams {
  projects: IProject[],
  id: IProject['id']
}

export interface IGetProjectByTaskParams {
  projects: IProject[],
  task: ITask,
}