import {ITask, TaskPriority, TaskStatus} from "../../../entities/Task";
import {IGetProjectByIdParams} from "./types";
import {IProject} from "../../../entities/Project";
import {getStorageId, ProjectsContext, setStorageId} from "../../../app/model/appHelper";
import {TASK_ID_KEY} from "../../../app/constants/localStorage";
import {useContext} from "react";

export const getProjectById = ({ projects, id }: IGetProjectByIdParams) => projects.find((project) => project.id === id)

export const getFilteredTasks = (project: IProject | undefined)=> {
  if (!project || !project.tasks) return

  const filteredTasks = {
    [TaskStatus.queue]: [],
    [TaskStatus.development]: [],
    [TaskStatus.done]: []
  } as { [key in TaskStatus]: ITask[] };

  project.tasks.forEach((task) => filteredTasks[task.status].push(task));

  return filteredTasks;
}

export const useAddTask = () => {
  const { projects, setProjects } = useContext(ProjectsContext);

  const addTask = ({ status, project }: {status: TaskStatus, project: IProject | undefined}) => {
    if (!project) return;

    const taskId = getStorageId(TASK_ID_KEY);
    const newTask: ITask = {
      id: taskId,
      createdAt: new Date(),
      status,
      description: '',
      title: '',
      priority: TaskPriority.none,
    }

    projects.forEach((someProject) => {
      if (someProject.id === project.id && someProject.tasks) someProject.tasks.unshift(newTask)
    })

    setProjects([...projects]);
    setStorageId(taskId + 1, TASK_ID_KEY);
  }

  return {addTask}
}