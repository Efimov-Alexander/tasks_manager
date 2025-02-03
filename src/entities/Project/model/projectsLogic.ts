import {ITask} from "../../../features/Task";
import {IProject} from "../index";

export const getProjectByTask = ({ projects, task }: { projects: IProject[], task: ITask }) => projects.find((project) => project.tasks[task.status].some((anotherTask) => anotherTask.id === task.id));

export const getProjects = (): IProject[] => {
  const projects = localStorage.getItem('projects');

  return projects ? JSON.parse(projects) : [];
}