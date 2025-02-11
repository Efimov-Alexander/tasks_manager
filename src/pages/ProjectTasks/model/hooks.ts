import {ITask, TaskPriority, TaskStatus} from "../../../entities/Task";
import {IProject} from "../../../entities/Project";
import {getStorageId, ProjectsContext, setStorageId} from "../../../app/model/appHelper";
import {TASK_ID_KEY} from "../../../app/constants/localStorage";
import {useContext} from "react";
import {ISubtask, TTaskOrSubTask} from "../../../entities/Task/model/types";
import {useChangeSubTaskValue, useChangeTaskValue} from "../../../entities/Task/model/hooks";
import {getProjectByTask} from "./projectTasksHelper";

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

export const useAddSubTask = () => {
  const { projects } = useContext(ProjectsContext);
  const { changeTaskValue } = useChangeTaskValue();

  const addSubtask = ({ task }: {task: ITask}) => {
    const project = getProjectByTask({task, projects})

    if (!project) return;

    const taskId = getStorageId(TASK_ID_KEY);
    const newTask: ISubtask = {
      id: taskId,
      createdAt: new Date(),
      status: TaskStatus.queue,
      description: '',
      mainTask: {
        id: task.id,
        title: task.title
      },
      title: '',
      priority: TaskPriority.none,
    }
    const newSubtasks = task.subTasks ? [...task.subTasks, newTask] : [newTask]

    changeTaskValue({task, valueName: 'subTasks', value: newSubtasks})
    setStorageId(taskId + 1, TASK_ID_KEY);
  }

  return {addSubtask}
}

export const useChangeDescription = () => {
  const {changeTaskValue} = useChangeTaskValue()
  const {changeSubTaskValue } = useChangeSubTaskValue()

  const changeDescription = (description: string, task: TTaskOrSubTask) => {
    'mainTask' in task ?
      changeSubTaskValue({valueName: 'description', task, value: description})
      : changeTaskValue({valueName: 'description', task, value: description})
  }

  return {changeDescription}
}
