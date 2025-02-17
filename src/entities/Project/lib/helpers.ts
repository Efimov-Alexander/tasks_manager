import type {ITask} from "src/entities/Task";
import type {IProject} from "../model/types";

export const getProjectByTask = ({ projects, task }: { projects: IProject[] | null, task: ITask }) => {
  if (!projects) return null

  return projects.find((project) => {
    if (!project.tasks) return false

    return project.tasks.some((someTask) => {
      if (someTask.id === task.id) return true
      if (someTask.subTasks) return someTask.subTasks.some((someTask) => someTask.id === task.id)

      return false
    })
  })
};

export const getProjectById = ({ projects, id }: { projects: IProject[] | null, id?: string }) => {
  if (!projects || !id) return

  return projects.find((project) => project.id === parseInt(id))
}

export const collectTasksAndSubtasks = (tasks?: ITask[]) => {
  if (!tasks) return []

  const result = [] as ITask[];

  tasks.forEach((task) => {
    result.push(task)

    if (task.subTasks) task.subTasks.forEach((task) => result.push(task))
  })

  return result
}
