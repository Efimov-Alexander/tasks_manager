import { IDropFilesParams, IDropTaskParams} from "./types";
import {useContext} from "react";
import {ProjectsContext} from "../../../app/ui/App";
import {getProjectByTask} from "src/entities/Project";

export const useDropTask = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  const dropTask = ({item, title: dropColumn}: IDropTaskParams) => {
    const dragColumn = item.status;
    const project = getProjectByTask({task: item, projects})

    if (!project || dragColumn === dropColumn) return projects;

    const { tasks } = project;

    tasks[dragColumn] = tasks[dragColumn].filter((task) => task.id !== item.id);
    tasks[dropColumn] = tasks[dropColumn].concat([{ ...item, status: dropColumn }]);

    setProjects([...projects]);
  }

  return { dropTask }
}
