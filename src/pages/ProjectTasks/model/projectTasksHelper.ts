import {IProject} from "../../../entities/Project";
import {ITask, TaskStatus} from "../../../entities/Task";
import {TTaskOrSubTask} from "../../../entities/Task/model/types";
import {SCROLL_OPTIONS} from "./peojectTasksConstants";
import {IGetProjectByIdParams, IGetProjectByTaskParams} from "./types";

export const getProjectById = ({ projects, id }: IGetProjectByIdParams) => projects.find((project) => project.id === id)

export const getProjectByTask = ({ projects, task }: IGetProjectByTaskParams) => {
  return projects.find((project) => {
    if (!project.tasks) return false

    return project.tasks.some((someTask) => {
      if (someTask.id === task.id) return true
      if (someTask.subTasks) return someTask.subTasks.some((someTask) => someTask.id === task.id)
    })
  })
};

export const getFilteredTasks = (project: IProject | undefined)=> {
  if (!project || !project.tasks) return

  const tasksAndSubtasks = collectTasksAndSubtasks(project.tasks);
  const filteredTasks = {
    [TaskStatus.queue]: [],
    [TaskStatus.development]: [],
    [TaskStatus.done]: []
  } as { [key in TaskStatus]: ITask[] };

  tasksAndSubtasks.forEach((task) => filteredTasks[task.status].push(task));

  return filteredTasks;
}

export const getSearchedTasks = (project: IProject | undefined, searchText: string) => {
  if (!project || !project.tasks) return [];

  const allTasks = collectTasksAndSubtasks(project.tasks);

  return allTasks.filter((task) => task.id === parseInt(searchText.trim()) || task.title.includes(searchText))
}

export const collectTasksAndSubtasks = (tasks: ITask[] | undefined) => {
  if (!tasks) return []

  const result = [] as TTaskOrSubTask[];

  tasks.forEach((task) => {
    result.push(task)

    if (task.subTasks) task.subTasks.forEach((task) => result.push(task))
  })

  return result
}

export const onFindTask = (id: number) => {
  const task = document.getElementById(`${id}`);

  if (!task) return

  task.scrollIntoView(SCROLL_OPTIONS);
  task.classList.add('finded-task')
  setTimeout(() => {task.classList.remove('finded-task')}, 3000);
}
