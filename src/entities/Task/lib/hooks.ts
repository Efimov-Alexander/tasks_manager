import {useContext} from "react";

import {ProjectsContext, getProjectByTask} from "src/entities/Project";

import type {ITask} from "../model/types";

export const useChangeSubTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeSubTaskValue<ValueName extends keyof ITask> ({task, value, valueName}: { task: ITask, value: ITask[ValueName], valueName: ValueName }) {
    const project = getProjectByTask({task, projects});

    if (!projects || !project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (!someTask.subTasks) return

      someTask.subTasks.forEach((someTask) => someTask.id === task.id ? someTask[valueName] = value : null)
    })

    setProjects([...projects])
  }

  return { changeSubTaskValue }
}

export const useChangeTaskValue = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  function changeTaskValue<ValueName extends keyof ITask> ({task, value, valueName}: { task: ITask, value: ITask[ValueName], valueName: ValueName }) {
    const project = getProjectByTask({task, projects});

    if (!projects || !project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (someTask.id === task.id) {
        someTask[valueName] = value

        if (someTask.subTasks && typeof value === 'string') someTask.subTasks.forEach((someTask) => someTask.mainTask ? someTask.mainTask.title = value : null)
      }
    })

    setProjects([...projects])
  }

  return { changeTaskValue }
}
