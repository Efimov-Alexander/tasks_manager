import {useContext} from "react";

import {getProjectByTask, ProjectsContext} from "src/entities/Project";
import {ITask, TASK_ID_KEY, TaskPriority, TaskStatus, useChangeTaskValue} from "src/entities/Task";
import {getStorageValue, setStorageValue} from "src/shared";

export const useAddSubtask = () => {
  const { projects } = useContext(ProjectsContext);
  const { changeTaskValue } = useChangeTaskValue();

  const addSubtask = ({ task }: {task: ITask}) => {
    const project = getProjectByTask({task, projects})
    const taskId = getStorageValue(TASK_ID_KEY);

    if (!project || typeof taskId !== 'number') return;

    const newTask: ITask = {
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
    setStorageValue({value: taskId + 1, key: TASK_ID_KEY});
  }

  return {addSubtask}
}