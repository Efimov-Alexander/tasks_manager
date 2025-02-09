import {IProject} from "../../../entities/Project";

export interface IGetProjectByIdParams {
  projects: IProject[],
  id: IProject['id']
}