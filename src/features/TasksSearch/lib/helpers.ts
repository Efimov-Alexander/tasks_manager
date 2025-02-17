import {IProject, collectTasksAndSubtasks} from "src/entities/Project";

export const getSearchedTasks = (project: IProject, searchText: string) => {
  const allTasks = collectTasksAndSubtasks(project.tasks);

  return allTasks.filter((task) => task.id === parseInt(searchText.trim()) || task.title.includes(searchText))
}