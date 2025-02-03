import {IChangeTaskValue, ITask} from "./types";
import {getProjectByTask} from "../../../entities/Project";
import {useContext} from "react";
import {ProjectsContext} from "../../../app/ui/App";



export const useChangeTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeTaskValue<ValueName extends keyof ITask> ({task, value, valueName}: { task: ITask, value: ITask[ValueName], valueName: ValueName }) {
    const project = getProjectByTask({projects, task});

    if (!project) return projects;

    project.tasks[task.status].forEach((anotherTask) => {
      if (anotherTask.id === task.id) {
        console.log(value)
        anotherTask[valueName] = value;
      }
      return task;
    })
    console.log(projects[0].tasks)
    setProjects([...projects])
  }

  return { changeTaskValue }
}
