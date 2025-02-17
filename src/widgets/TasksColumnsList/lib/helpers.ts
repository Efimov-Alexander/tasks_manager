import {collectTasksAndSubtasks, IProject} from "src/entities/Project";
import {ITask, TaskStatus} from "src/entities/Task";

export const getFilteredTasks = (project?: IProject)=> {
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