import {IRoute} from "./types";
import {ROUTES} from "../constants/routes";
import ProjectsSelection from "../../pages/ProjectsSelection";
import ProjectTasks from "../../pages/ProjectTasks";

export const routesConfig: IRoute[] = [
  {
    path: ROUTES.tasks_manager.index,
    component: <ProjectsSelection/>
  },
  {
    path: ROUTES.tasks_manager.projects.show,
    component: <ProjectTasks/>
  }
]