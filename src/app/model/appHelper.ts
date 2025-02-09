import {
  INIT_PROJECTS,
} from "../constants/data";
import {IProject} from "../../entities/Project";
import {createContext} from "react";
import {IProjectsContext} from "./types";
import {COMMENT_ID_KEY, INIT_COMMENT_ID, INIT_TASK_ID, PROJECTS_KEY, TASK_ID_KEY} from "../constants/localStorage";

export const ProjectsContext = createContext<IProjectsContext>({
  projects: INIT_PROJECTS,
  setProjects: () => {},
});

export const initData = () => {
  const storageProjects = getStorageProjects();
  const storageTaskId = getStorageId(TASK_ID_KEY);
  const storageCommentId = getStorageId(COMMENT_ID_KEY);

  if (!storageProjects.length) localStorage.setItem(PROJECTS_KEY, JSON.stringify(INIT_PROJECTS));
  if (!storageTaskId) localStorage.setItem(TASK_ID_KEY, JSON.stringify(INIT_TASK_ID));
  if (!storageCommentId) localStorage.setItem(COMMENT_ID_KEY, JSON.stringify(INIT_COMMENT_ID));
}

export const getStorageId = (key: string) => {
  const taskId = localStorage.getItem(key);

  return taskId ? JSON.parse(taskId) : 0;
}

export const getStorageProjects = (): IProject[] => {
  const projects = localStorage.getItem(PROJECTS_KEY);

  return projects ? JSON.parse(projects) : [];
}

export const setStorageId = (id: number, key: string) => localStorage.setItem(key, JSON.stringify(id))

export const setStorageProjects = (projects: IProject[]) => localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
