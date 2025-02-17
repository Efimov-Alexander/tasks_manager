import ProjectsSelection from "src/pages/ProjectsSelection";
import ProjectTasks from "src/pages/ProjectTasks";
import {ROUTES} from "src/shared";

import type {IRoute} from "../model/types";

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