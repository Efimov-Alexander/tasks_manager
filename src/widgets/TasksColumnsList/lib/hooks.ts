import {useContext} from "react";

import {getProjectByTask, IProject, ProjectsContext} from "src/entities/Project";
import {ITask, TASK_ID_KEY, TaskPriority, TaskStatus} from "src/entities/Task";
import {getStorageValue, setStorageValue} from "src/shared";

export const useAddTask = () => {
  const { projects, setProjects } = useContext(ProjectsContext);

  const addTask = ({ status, projectId }: {status: TaskStatus, projectId: IProject['id']}) => {
    const taskId = getStorageValue(TASK_ID_KEY);

    if (!projects || !taskId || typeof taskId !== 'number') return;

    const newTask: ITask = {
      id: taskId,
      createdAt: new Date(),
      status,
      description: '',
      title: '',
      priority: TaskPriority.none,
    }

    projects.forEach((someProject) => {
      if (someProject.id === projectId && someProject.tasks) someProject.tasks.unshift(newTask)
    })

    setProjects([...projects]);
    setStorageValue({key: TASK_ID_KEY, value: taskId + 1});
  }

  return {addTask}
}

export const useOnDropTask = () => {
  const { setProjects, projects } = useContext(ProjectsContext);

  const dropTask = ({task, column}: { task: ITask, column: TaskStatus }) => {
    const project = getProjectByTask({task, projects});

    if (!projects || !project || !project.tasks) return;

    project.tasks.forEach((someTask) => {
      if (someTask.id === task.id) {
        someTask.status = column;
        column === TaskStatus.done ? someTask.endedAt = new Date() : delete someTask.endedAt;
      }

      if (someTask.subTasks) someTask.subTasks.forEach((someTask) => {
        if (someTask.id === task.id) {
          someTask.status = column;
          column === TaskStatus.done ? someTask.endedAt = new Date() : delete someTask.endedAt;
        }
      })
    })

    setProjects([...projects])
  }

  return { dropTask }
}

